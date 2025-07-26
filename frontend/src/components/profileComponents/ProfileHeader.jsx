import { motion } from "framer-motion";
import { User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = ({ profile, isEditing, setIsEditing, itemVariants }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm mt-6">
        <div className="h-24 sm:h-32 bg-darkblue"></div>
        <CardContent className="relative -mt-12 sm:-mt-16 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.img} alt={profile.name} />
                <AvatarFallback className="text-xl sm:text-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <User size={32} className="text-blue-600" />
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {profile.name}
              </h1>
              <p className="text-white">@{profile.username}</p>
              <p className="text-gray-900 break-all">{profile.email}</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {profile.role}
              </Badge>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);

                  if (!isEditing) {
                    // Delay scroll to allow form to render
                    setTimeout(() => {
                      const target = document.getElementById(
                        "edit-profile-section"
                      );
                      if (target) {
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 1);
                  }
                }}
                className={`shadow-lg w-full sm:w-auto ${
                  isEditing
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-darkblue hover:bg-teal-700 text-white"
                }`}
              >
                <Edit size={16} className="mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;
