import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatDate = (dateString) => {
  if (!dateString) return "Not provided";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); 
};

const ProfileInfoCards = ({ profile, itemVariants }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Account Details */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">User ID</span>
              <span className="font-medium">#{profile.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Username</span>
              <span className="font-medium">@{profile.username}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Role</span>
              <Badge variant="outline" className="text-xs">
                {profile.role}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              User Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 py-2">
              <Mail size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium break-all">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <Calendar size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Birthday</p>
                <p className="font-medium">{formatDate(profile.birthday)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <Calendar size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">{formatDate(profile.memberSince)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security & Privacy */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Profile Status</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Active
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Verification</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                Verified
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Privacy</span>
              <Badge variant="outline" className="text-xs">
                Protected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileInfoCards;