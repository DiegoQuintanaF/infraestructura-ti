export default function Checkout() {
  return (
    <div className="container h-page w-full pt-8">
      <div>
        <p></p>
      </div>
      <AudiditoriumSeats />
    </div>
  )
}

function AudiditoriumSeats() {
  const seats = [
    ['A', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    ['B', [11, 12, 12, 14, 15, 16, 17, 18, 19, 20]],
    ['C', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
    ['D', [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]],
    ['E', [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]],
    ['F', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60]]
  ]

  return (
    <div className="mx-auto flex max-w-[250px] flex-col items-center">
      <h1 className="text-center">Pantalla</h1>
      <hr className="mb-4 h-1 w-full border border-indigo-200 bg-indigo-200" />
      <div className="grid grid-cols-[12] gap-2">
        <form className="w-max flex-col items-center">
          <div className="flex flex-col justify-between">
            {seats.map(([row, seats]) => (
              <div key={row as string} className="flex justify-between gap-4">
                <span>Fila {row}:</span>
                <div className="flex gap-1">
                  {(seats as number[]).map((seat) => (
                    <label key={seat} htmlFor={`seat-${seat}`}>
                      <input
                        className="rounded-full "
                        type="checkbox"
                        name={`seat-${seat}`}
                        value={`${row}-${seat}`}
                      />
                      {''}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <input
            className="mx-auto mt-4 cursor-pointer rounded-md border border-black px-4 py-1 hover:bg-gray-100"
            type="submit"
            value="Reservar"
          />
        </form>
      </div>
    </div>
  )
}
