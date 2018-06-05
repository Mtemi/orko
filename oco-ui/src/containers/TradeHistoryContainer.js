import React from "react"
import { connect } from "react-redux"
import TradeHistory from "../components/TradeHistory"
import Loading from "../components/primitives/Loading"
import { getTradeHistoryInReverseOrder } from "../selectors/coins"

class TradeHistoryContainer extends React.Component {
  render() {
    return !this.props.tradeHistory ? (
      <Loading p={2} />
    ) : (
      <TradeHistory trades={this.props.tradeHistory} />
    )
  }
}

function mapStateToProps(state, props) {
  const tradeHistory = getTradeHistoryInReverseOrder(state);
  return {
    tradeHistory: tradeHistory ? tradeHistory.slice(0) : null
  }
}

export default connect(mapStateToProps)(TradeHistoryContainer)