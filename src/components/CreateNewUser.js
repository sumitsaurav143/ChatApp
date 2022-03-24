
export default function CreateNewUser(props) {
const { NewUser, value, onChange}=props;
    return (
        <div className="Login_Page">
            <form onSubmit={NewUser} >
              <div>
                <label className="username_label">Please provide your name:-</label>
              </div>
              <div className="username_btn">
                <input className="username" type="text" value={value} onChange={onChange} />
              </div>
            </form>
          </div>
    )
}
