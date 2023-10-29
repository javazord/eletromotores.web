
export default function Render({ render, ...props }) {
    
    return render ? props.children : false;
}