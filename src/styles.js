// @flow

export const RowStyle = {
    display: 'flex',
    height: '45px',
    padding: '15px'
};

export const ButtonStyle = {
    border: '1px solid #BBB',
    borderRadius: '6px',
    color: '#BBB',
    padding: '13px 10px',
    marginRight: '15px',
    cursor: 'pointer',
    fontFamily: '"San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif'
};

export const SelectedButtonStyle = {
    ...ButtonStyle,
    borderColor: '#666',
    color: '#666',
    fontWeight: 'bold'
};
