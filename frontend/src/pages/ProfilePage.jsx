import ProfilePageComponent from "../components/ProfileComponent";

function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex-1">
        <ProfilePageComponent />
      </div>
    </div>
  );
}

export default ProfilePage;
