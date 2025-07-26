import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import ProfileInfoCards from "../components/profileComponents/ProfileInfoCards";
import ProfileEditForm from "../components/profileComponents/ProfileEditForm";
import { useProfile } from "../hooks/profileHooks/useProfile";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4 * i,
    },
  }),
};

const ProfilePageComponent = () => {
  const {
   profile,
    isEditing,
    loading,
    saving,
    error,
    uploading,           
    setIsEditing,
    handleChange,
    handleUpdate,
    handleFileUpload,    
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Failed to load profile information</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-6"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        itemVariants={fadeInUp}
      />
      <ProfileInfoCards profile={profile} itemVariants={fadeInUp} />
         <ProfileEditForm
        form={profile}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleFileUpload={handleFileUpload}  
        uploading={uploading}               
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        saving={saving}
        itemVariants={fadeInUp}
      />
    </motion.div>
  );
};

export default ProfilePageComponent;
