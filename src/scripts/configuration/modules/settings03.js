const renderSettings3 = ({ state }) => {
  const wallets = state.get('wallets');
  const skipSetup = state.get('skipSetup');
  const block = wallets.find(w => w.abbr === 'BLOCK');
  const html = `
          <p style="margin-top:0;padding-top:0;padding-left:10px;padding-right:10px;margin-bottom:5px;">In order to conduct peer-to-peer trades, Block DX requires access to the <a href="#" class="blocknet-link js-blocknetWalletLink">Blocknet wallet</a>. Please enter the RPC credentials found in <em>blocknetdx.conf</em>.</p>
          <div class="main-area" style="background-color:#0e2742;overflow-y:auto;">
            <div class="input-group">
              <label>Blocknet RPC Port</label>
              <input id="js-rpcPort" type="text" value="${state.get('rpcPort')}" ${skipSetup ? '' : 'readonly'} />
            </div>
            <div class="input-group">
              <label>Blocknet RPC User</label>
              <input id="js-rpcUser" type="text" value="${block.username}" />
            </div>
            <div class="input-group">
              <label>Blocknet RPC Password</label>
              <input id="js-rpcPassword" type="text" value="${block.password}" />
            </div>
          </div>
          <div id="js-buttonContainer" class="button-container">
            <button id="js-backBtn" type="button" class="gray-button">BACK</button>
            <button id="js-continueBtn" type="button">CONTINUE</button>
          </div>
        `;
  return html;
};

module.exports = renderSettings3;
