import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    return (
      <div>
        <button
          data-testid="decrement-count"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div data-testid="active-count">0</div>
        <button
          data-testid="increment-count"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
