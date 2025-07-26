import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import DOMPurify from "dompurify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { X } from "lucide-react"
import categories from "../../json/community/communityCategories.json"

const CommunityPostForm = ({ onSubmit, onCancel, isOpen }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const isReady = title.trim() && content.trim() && category.trim()

  const submit = (e) => {
    e.preventDefault()
    if (!isReady) return

    onSubmit?.({
      title: title.trim(),
      content: DOMPurify.sanitize(content),
      category
    })

    setTitle("")
    setContent("")
    setCategory("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
    
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Share Your Experience</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <label className="text-sm font-medium block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label className="text-sm font-medium block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to share or discuss?"
            />

            <label className="text-sm font-medium block">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="bg-white rounded"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                onClick={onCancel}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isReady}
                className="bg-darkblue hover:bg-teal-700 text-white"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommunityPostForm
