const Palette = (props) => {
  const { changeColor } = props;
  return (
    <section className="palette">
      <button name="white" className="white" title="White" onClick={ changeColor }></button>
      <button name="lightcoral" className="lightcoral" title="Red" onClick={ changeColor }></button>
      <button name="goldenrod" className="goldenrod" title="Orange" onClick={ changeColor }></button>
      <button name="khaki" className="khaki" title="Yellow" onClick={ changeColor }></button>
      <button name="palegreen" className="palegreen" title="Green" onClick={ changeColor }></button>
      <button name="paleturquoise" className="paleturquoise" title="Teal" onClick={ changeColor }></button>
      <button name="lightcyan" className="lightcyan" title="Blue" onClick={ changeColor }></button>
      <button name="lightblue" className="lightblue" title="Dark blue" onClick={ changeColor }></button>
      <button name="plum" className="plum" title="Purple" onClick={ changeColor }></button>
      <button name="mistyrose" className="mistyrose" title="Pink" onClick={ changeColor }></button>
      <button name="wheat" className="wheat" title="Brown" onClick={ changeColor }></button>
      <button name="lavender" className="lavender" title="Gray" onClick={ changeColor }></button>
    </section>
  );
};

export default Palette;
