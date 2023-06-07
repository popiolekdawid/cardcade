const Profile = (props) => {
    const profile = props.profile;
    return (
      <>
      <h3>{profile.firstName} {profile.lastName}</h3>
       <strong>id: </strong> {profile._id} <br />
       <strong>email: </strong> {profile.email} <br />
      </>
    );
  };
  export default Profile;
  