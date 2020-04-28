export function LongText(props) {

    const {howMuchLong, text, className} = props

    return (
            <p className={className}>{text.substring(0, howMuchLong) + '...'}</p>
    )
}