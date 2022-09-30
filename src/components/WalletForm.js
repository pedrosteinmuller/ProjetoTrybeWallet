import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, fetchAddExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    expense: '',
    expenseDescription: '',
    currencyCoin: 'USD',
    payMethod: 'Dinheiro',
    expenseTag: 'Alimentação',
  };

  // componentDidMount() {
  //   const { fetchCoins } = this.props;
  //   fetchCoins();
  // }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleButton = () => {
    const { addExpenseToRedux } = this.props;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const {
      id,
      expense,
      expenseDescription,
      currencyCoin,
      payMethod,
      expenseTag } = this.state;
    addExpenseToRedux({
      id,
      expense,
      expenseDescription,
      currencyCoin,
      payMethod,
      expenseTag,
    });
    this.setState({
      expense: '',
      expenseDescription: '',
      currencyCoin: 'USD',
      payMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    });
  };

  render() {
    const {
      expense,
      expenseDescription,
      currencyCoin,
      payMethod,
      expenseTag } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        Valor:
        <input
          type="number"
          data-testid="value-input"
          value={ expense }
          name="expense"
          onChange={ (item) => this.handleInput(item) }
        />
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          value={ expenseDescription }
          name="expenseDescription"
          onChange={ (item) => this.handleInput(item) }
        />
        Moeda:
        <select
          data-testid="currency-input"
          value={ currencyCoin }
          name="currencyCoin"
          onChange={ (item) => this.handleInput(item) }
        >
          {
            currencies.map((element, index) => <option key={ index }>{element}</option>)
          }
        </select>
        Método de pagamento:
        <select
          data-testid="method-input"
          value={ payMethod }
          name="payMethod"
          onChange={ (item) => this.handleInput(item) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        Categoria:
        <select
          data-testid="tag-input"
          value={ expenseTag }
          name="expenseTag"
          onChange={ (item) => this.handleInput(item) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
  addExpenseToRedux: (info) => dispatch(fetchAddExpenses(info)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  addExpenseToRedux: PropTypes.func.isRequired,
};

// https://reactjs.org/docs/typechecking-with-proptypes.html

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
