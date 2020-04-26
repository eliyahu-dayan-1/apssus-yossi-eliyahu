export function LongTxt(props) {
    const {howMuchLong, text} = props
    return (
        <article >
            <p className="long-txt"><span>description:</span> {text.substring(0, howMuchLong)}</p>
        </article>
    )
}