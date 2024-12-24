import { Button } from "../../components/ui/button"
import fileUpload from '../../assets/images/fileUpload.png'
export default function FileUpload() {
  return (
    <div className="border border-dashed rounded-lg p-6">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.80443 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-1">Upload Your Invoice</h3>
        <p className="text-sm text-muted-foreground mb-8">
          To auto-populate fields and save time
        </p>
        <img src={fileUpload} style={{width:'250px', height:'250px'}}/>
        <Button variant="outline" className="mb-2">
          Upload file
        </Button>
        <p className="text-xs text-muted-foreground">
          <span className="text-color">Click to upload</span> or drag and drop
        </p>
      </div>
    </div>
  )
}

