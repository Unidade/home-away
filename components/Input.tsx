import classNames from 'classnames'
import { FieldHookConfig, useField } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import React from 'react'

const Input = ({
  type = '',
  label = '',
  className = '',
  ...props
}: IInputProps) => {
  const [field, meta] = useField(props as FieldHookConfig<any>)
  const error = meta?.touched && meta?.error

  return (
    <div className={classNames(className, 'flex flex-col space-y-1')}>
      {label ? (
        <label htmlFor='email' className='text-gray-600'>
          {label}
        </label>
      ) : null}

      <div className='flex-1'>
        {type === 'textarea' ? (
          <textarea
            {...field}
            {...props}
            className={classNames(
              'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
            )}
          />
        ) : (
          <div className='relative'>
            <input
              {...field}
              {...props}
              type={type}
              className={classNames(
                'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
                error
                  ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
              )}
            />
            {error && type !== 'number' ? (
              <span className='pr-2 absolute right-0 top-1/2 -translate-y-1/2'>
                <ExclamationCircleIcon className='w-6 h-6 text-red-500' />
              </span>
            ) : null}
          </div>
        )}
      </div>

      {error ? (
        <p id='email' className='text-red-600 text-sm first-letter:uppercase'>
          {error}
        </p>
      ) : null}
    </div>
  )
}

interface IInputProps {
  type: string
  label?: string
  name?: string
  className?: string
  placeholder?: string
  props?: any
  disabled?: boolean
  spellCheck?: boolean
}

export default Input
