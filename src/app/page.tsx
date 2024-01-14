import Navbar from "@/components/Navbar" 
import AllCards from "@/components/Cropper/AllCards"
import Embed from "@/components/Embed"

export default function Home() {
  return (
    <div className="mb-20">
      <Navbar />
      <h2 className="text-center font-semibold text-3xl lg:text-4xl mt-5">Upload Essay Image</h2>
      <AllCards />
      <Embed />
    </div>
  )
}
