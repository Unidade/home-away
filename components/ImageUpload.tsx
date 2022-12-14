import React, { useState, useRef, RefObject } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { ArrowUpIcon } from '@heroicons/react/outline'

interface IImageUploadProps {
  label?: string
  initialImage?: { src: string; alt: string } | null
  objectFit?: string
  sizeLimit?: number
  accept?: string
  onChangePicture?: (image: string) => Promise<void>
}

const ImageUpload = ({
  label = 'Image',
  initialImage = null,
  objectFit = 'object-cover',
  accept = '.png, .jpg, .jpeg, .gif',
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture,
}: IImageUploadProps) => {
  const pictureRef = useRef<null | HTMLInputElement>(null)

  const [image, setImage] = useState<{ src: string; alt: string } | null>(
    initialImage
  )
  const [updatingPicture, setUpdatingPicture] = useState(false)
  const [pictureError, setPictureError] = useState<null | string>(null)

  const handleOnChangePicture = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    const fileName = file?.name?.split('.')?.[0] ?? 'New file'

    reader.addEventListener(
      'load',
      async function () {
        try {
          setImage({ src: reader.result as string, alt: fileName })
          if (typeof onChangePicture === 'function') {
            await onChangePicture(reader.result as string)
          }
        } catch (err) {
          toast.error('Unable to update image')
        } finally {
          setUpdatingPicture(false)
        }
      },
      false
    )

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true)
        setPictureError('')
        reader.readAsDataURL(file)
      } else {
        setPictureError('File size is exceeding 10MB.')
      }
    }
  }

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click()
    }
  }

  return (
    <div className='flex flex-col space-y-2'>
      <label className='text-gray-600'>{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={classNames(
          'group aspect-w-16 aspect-h-9 relative overflow-hidden rounded-md transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          image?.src
            ? 'hover:opacity-50 disabled:hover:opacity-100'
            : 'border-2 border-dashed hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-200'
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ''}
            fill
            className={`${objectFit}`}
          />
        ) : null}

        <div className='flex items-center justify-center'>
          {!image?.src ? (
            <div className='flex flex-col items-center space-y-2'>
              <div className='shrink-0 rounded-full bg-gray-200 p-2 transition group-hover:scale-110 group-focus:scale-110'>
                <ArrowUpIcon className='h-4 w-4 text-gray-500 transition' />
              </div>
              <span className='text-xs font-semibold text-gray-500 transition'>
                {updatingPicture ? 'Uploading...' : 'Upload'}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type='file'
            accept={accept}
            onChange={handleOnChangePicture}
            className='hidden'
          />
        </div>
      </button>

      {pictureError ? (
        <span className='text-sm text-red-600'>{pictureError}</span>
      ) : null}
    </div>
  )
}

export default ImageUpload
