export class ColorTransform{
  constructor(color){
  this.color = color
  }

  #getColor(){
    const color_block = document.createElement('div')
    color_block.className = 'color_block'
    color_block.style.background = `${this.color}`
    return color_block
  }
  render(){
    return this.#getColor()
  }
}