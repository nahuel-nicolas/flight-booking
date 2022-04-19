import './Shadow.css'

export default function Shadow({ children, isDisplay }) {
    // isDisplay.toString()
    return (
        <div className="shadow"  isdisplay={isDisplay.toString()}>
            <div className="shadow_container">
                {children}
            </div>
        </div>
    )
}