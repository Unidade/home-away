import { useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
import { Formik, Form } from 'formik'
import Input from './Input'
import ImageUpload from './ImageUpload'

import { fetchJSON } from '../lib/fetchJSON'
import { Home } from '@prisma/client'

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  guests: Yup.number().positive().integer().min(1).required(),
  beds: Yup.number().positive().integer().min(1).required(),
  baths: Yup.number().positive().integer().min(1).required()
})

const ListingForm = ({
  initialValues,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => new Promise((resolve) => resolve())
}: IListingForm) => {
  const router = useRouter()

  const [disabled, setDisabled] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '')

  const upload = async (image: string) => {
    if (!image) return

    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Uploading...')

      const { url: imageURL } = await fetchJSON('/api/image-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ image })
      })
      console.log(imageURL)
      setImageUrl(imageURL)
      toast.success('Successfully uploaded', { id: toastId })
    } catch (e) {
      toast.error('Unable to upload', { id: toastId })
      setImageUrl('')
    } finally {
      setDisabled(false)
    }
  }

  const handleOnSubmit = async (
    values: Omit<Home, 'image' | 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>
  ) => {
    console.log(values)
    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Submitting...')
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values, image: imageUrl })
      }
      toast.success('Successfully submitted', { id: toastId })
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath)
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId })
      setDisabled(false)
    }
  }

  const { image, ...initialFormValues } = initialValues ?? {
    image: '',
    title: '',
    description: '',
    price: 0,
    guests: 1,
    beds: 1,
    baths: 1,
    ownerId: ''
  }

  return (
    <div>
      <div className='mb-8 max-w-md'>
        <ImageUpload
          initialImage={{ src: image as string, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>

      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className='space-y-8'>
            <div className='space-y-6'>
              <Input
                name='title'
                type='text'
                label='Title'
                placeholder='Entire rental unit - Amsterdam'
                disabled={disabled}
              />

              <Input
                name='description'
                type='textarea'
                label='Description'
                placeholder='Very charming and modern apartment in Amsterdam...'
                disabled={disabled}
                rows={5}
              />

              <Input
                name='price'
                type='number'
                min='0'
                label='Price per night'
                placeholder='100'
                disabled={disabled}
              />

              <div className='flex space-x-4'>
                <Input
                  name='guests'
                  type='number'
                  min='0'
                  label='Guests'
                  placeholder='2'
                  disabled={disabled}
                />
                <Input
                  name='beds'
                  type='number'
                  min='0'
                  label='Beds'
                  placeholder='1'
                  disabled={disabled}
                />
                <Input
                  name='baths'
                  type='number'
                  min='0'
                  label='Baths'
                  placeholder='1'
                  disabled={disabled}
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={disabled || !isValid}
                className='rounded-md bg-blue-600 py-2 px-6 text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600'
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

interface IListingForm {
  initialValues?: Pick<
    Home,
    'baths' | 'beds' | 'title' | 'description' | 'price' | 'guests' | 'image'
  >
  redirectPath: string
  buttonText: string
  onSubmit: (data: any) => Promise<void>
}

export default ListingForm
