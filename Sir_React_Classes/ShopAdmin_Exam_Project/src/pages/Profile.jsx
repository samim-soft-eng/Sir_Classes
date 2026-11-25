import PageHeading from '../components/common/PageHeading.jsx'
import { useStore } from '../context/StoreContext.jsx'

function Profile() {
  const { user } = useStore()
  const name = user.email.split('@')[0]
  return <><PageHeading eyebrow="YOUR ACCOUNT" title="Profile" description="Your account details." /><section className="panel profile-card"><span className="profile-avatar">{name.slice(0, 1).toUpperCase()}</span><div><p className="eyebrow">STORE ADMIN</p><h2>{name}</h2><p className="muted">{user.email}</p></div></section></>
}

export default Profile
