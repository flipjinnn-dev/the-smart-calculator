export default function Logo() {
  return (
    <div className="relative w-12 h-12 hover:scale-105 transition-all duration-300">
      {/* Circular background with Google colors */}
      <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
        {/* Blue quarter */}
        <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500 rounded-tl-full"></div>
        {/* Red quarter */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-tr-full"></div>
        {/* Green quarter */}
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-green-500 rounded-bl-full"></div>
        {/* Yellow quarter */}
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-yellow-500 rounded-br-full"></div>
      </div>

      {/* White calculator icon in center */}
      <div className="absolute inset-2 bg-white rounded-lg flex flex-col items-center justify-center shadow-inner">
        <div className="w-4 h-1 bg-blue-500 rounded-full mb-1"></div>
        <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  )
}
