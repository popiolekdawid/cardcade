const Profile = (props) => {
    const profile = props.profile;
    return (
      <>
        <h3>{profile.firstName} {profile.lastName}</h3>
        <strong>id: </strong> {profile._id} <br />
        <strong>email: </strong> {profile.email} <br />
        <strong>flashcards: </strong><br />
        {profile.flashcards.map((flashcard, index) => (
            <><strong>{index+1}.</strong> {flashcard.word} - {flashcard.translation}<br /></>
        ))}
      </>
    );
  };
  export default Profile;
  