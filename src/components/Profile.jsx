
const Profile = ({user}) => {

  console.log(user)


  if (!user) {
    return <p>Loading profile...</p>; // or return null
  }


  return (
  <div className="h-full bg-blue-50 flex items-center justify-center overflow-hidden">
    <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10">
      <div className=" mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
          👩‍🏫 {user.role} Profile
        </h2>
        <p className="text-gray-500 text-lg">Details of the {user.role}</p>
      </div>

    <div className="grid gap-4 text-gray-800 text-lg">
  <div className="flex items-center">
    {/* <p className="font-semibold w-24 m-0">Name:</p> */}
    {/* <p className="m-0">{user.firstname}</p> */}
  </div>
  <div className="flex items-center">
    <p className="font-semibold w-24 m-0">Email:</p>
    <p className="m-0">{user.email}</p>
  </div>
  <div className="flex items-center">
    <p className="font-semibold w-24 m-0">Role:</p>
    <p className="m-0">{user.role}</p>
  </div>
</div>

    </div>
  </div>
);

};

export default Profile;
