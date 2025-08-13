# 🚀 SINCO Launch Day Context

## Quick Contract Address Update Guide

### Current Status
All contract addresses have been replaced with placeholder: `CONTRACT_ADDRESS_PLACEHOLDER_UPDATE_AT_LAUNCH`

### Files Containing Placeholders
1. `src/data/config.ts:28` - Central configuration (drives Hero copy button)
2. `src/components/charts/TradingViewWidget.tsx:12` - DexScreener integration
3. `src/components/charts/PriceChart.tsx:22` - Price chart API calls  
4. `src/components/integrations/PumpFunWidget.tsx:19` - Pump.fun widget links

### Launch Day Commands

**Single command to update all addresses:**
```bash
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/CONTRACT_ADDRESS_PLACEHOLDER_UPDATE_AT_LAUNCH/ACTUAL_CONTRACT_ADDRESS_HERE/g'
```

**Verification commands:**
```bash
# Verify all placeholders were replaced
grep -r "CONTRACT_ADDRESS_PLACEHOLDER" src/

# Verify new address is in place
grep -r "ACTUAL_CONTRACT_ADDRESS" src/

# Test build
npm run build
```

### Preserved Functionality
- ✅ One-click copy button (`src/components/ui/CopyButton.tsx`)
- ✅ DexScreener chart integration with live data
- ✅ Pump.fun widget with trading links
- ✅ Price chart with API connections
- ✅ All styling and animations intact

### Launch Day Process
1. Get new contract address
2. Run find/replace command above
3. Verify with grep commands
4. Run build to confirm
5. Commit and push changes
6. Deploy

### Quick Tell Claude
"Update contract address to [NEW_ADDRESS]" - Claude will know exactly what to do with this context file present.

---
*Created: 2025-08-13*
*Purpose: Rapid contract address deployment at launch*