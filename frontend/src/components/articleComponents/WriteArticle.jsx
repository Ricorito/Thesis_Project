import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import articleCategories from "../../json/article/articleCategories.json";

import { useArticle } from "../../hooks/articleHooks/useArticle";

const WriteArticle = () => {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    cat,
    setCat,
    file,
    setFile,
    currentImage,
    saving,
    handleSubmit,
  } = useArticle();

  return (
    <div className="add min-h-screen mt-10 px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row gap-8 pb-12">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="content w-full lg:w-[75%] xl:w-[80%] flex flex-col gap-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
        <div className="editorContainer flex-grow">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            className="editor bg-white rounded shadow-sm h-full"
            style={{ minHeight: "calc(100% - 1rem)" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="menu w-full lg:w-[25%] xl:w-[20%] flex flex-col-reverse lg:flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {articleCategories.map(({ label, value }) => (
                <div
                  className="flex items-center gap-2 w-[calc(50%-0.5rem)]"
                  key={value}>
                  <input
                    type="radio"
                    checked={cat === value}
                    name="cat"
                    value={value}
                    id={value}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor={value}> {label} </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <h2 className="text-xl font-semibold">Publish</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-1">
              <b>Status:</b> Draft
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <b>Visibility:</b> Public
            </p>
            {currentImage && !file && (
              <div className="mb-4">
                <img
                  src={`/upload/${currentImage}`}
                  alt="Current"
                  className="rounded shadow-sm w-full h-40 object-cover"
                />
              </div>
            )}
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className="file cursor-pointer text-teal-600 hover:underline text-sm">
              Upload image or file
            </label>
            <div className="buttons mt-4 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Save as draft
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={saving}
                size="sm"
                className="w-full sm:w-auto">
                {saving ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WriteArticle;
