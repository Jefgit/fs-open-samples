export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  console.log('====================================')
  console.log(message)
  console.log('====================================')
  return (
    <div className='error'>
      { message }
    </div>
  )
}