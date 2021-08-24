function Spalsh(userName, userNameHandler) {
  return (
    <div>
      <form>
        <input type='text' value={userName} onChange={userNameHandler} />
        <h1>What you're name</h1>
      </form>
    </div>
  );
}

export default Spalsh;
