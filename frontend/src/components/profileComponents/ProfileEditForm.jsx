import { motion, AnimatePresence } from "framer-motion";
import { Settings, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileEditForm = ({
  form,
  handleChange,
  handleUpdate,
  handleFileUpload,     
  setIsEditing,
  isEditing,
  saving,
  uploading,            
  itemVariants,
}) => {

  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          id="edit-profile-section"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Settings size={20} />
                Edit Profile Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={form.newPassword || ""}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword || ""}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                  />
                </div>

                {/* File upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Upload New Image</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="text-sm text-blue-600 flex items-center gap-2 mt-1">
                      <UploadCloud size={16} /> Uploading...
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: saving ? 1 : 1.02 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleUpdate}
                    disabled={saving}
                    className={`w-full shadow-lg text-white ${
                      saving ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                    }`}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="w-full sm:w-auto px-8"
                  >
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileEditForm;