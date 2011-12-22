#!/usr/bin/env python
#-*-*- encoding: utf-8 -*-*-
#
# Copyright (C) 2005-2009 University of Deusto
# All rights reserved.
#
# This software is licensed as described in the file COPYING, which
# you should have received as part of this distribution.
#
# This software consists of contributions made by many individuals, 
# listed below:
#
# Author: Pablo Orduña <pablo@ordunya.com>
# 

import weakref
from functools import wraps

CHECKING = True

def _check_types(func, args, kwargs, types):
    if len(args) + len(kwargs) != len(types):
        raise TypeError("%s: %s types provided but %s arguments passed" % (func.__name__, len(types), (len(args) + len(kwargs))))
    
    is_class = hasattr(func, 'im_func')
    func_code = func.func_code
    var_names = func_code.co_varnames[:func_code.co_argcount]
    if is_class:
        var_names = var_names[1:]
   
    kwargs_var_names = var_names[len(args):]
    try:
        kwargs_var_values = map(lambda arg_name : kwargs[arg_name], kwargs_var_names)
    except KeyError, ke:
        raise TypeError("Argument missing: %s" % ke)

    complete_ordered_args_list = list(args) + kwargs_var_values
    
    for arg, arg_type in zip(complete_ordered_args_list, types):
        if isinstance(arg_type, tuple):
            if not any(map(lambda concrete_arg_type : isinstance(arg, concrete_arg_type), arg_type)):
                raise TypeError("Possible argument types: %s. Got: %s" % (arg_type, type(arg)))
            continue
        
        if not isinstance(arg, arg_type):
            raise TypeError("Expected argument type: %s. Got: %s" % (arg_type, type(arg)))
        


def typecheck(*types):
    class TypeChecker(object):
        def __init__(self, func):
            self.func = func
            self.obj  = None
            self.func_varnames = self.func.func_code.co_varnames
            self.func_argcount = self.func.func_code.co_argcount
            self._original_args = self.func_varnames[0:self.func_argcount]

        def __get__(self, obj, type = None):
            if obj is not None:
                self.obj = weakref.ref(obj)
            return self.__class__(self.func.__get__(obj, type))

        def __call__(self, *args, **kwargs):
            if self.obj is not None:
                if CHECKING:
                    _check_types(self.func, args, kwargs, types)
                return self.func(self, *args, **kwargs)
            else:
                if CHECKING:
                   _check_types(self.func, args, kwargs, types)
                return self.func(*args, **kwargs)

    return TypeChecker

