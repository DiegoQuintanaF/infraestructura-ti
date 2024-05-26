import { useParams } from '@remix-run/react'

export default function Login() {
  const { purchaseId } = useParams()
  return (
    <div className="container flex h-page w-full flex-col items-center pt-8">
      {purchaseId != undefined && (
        <>
          <p>Detalles {purchaseId}</p>
        </>
      )}
    </div>
  )
}
