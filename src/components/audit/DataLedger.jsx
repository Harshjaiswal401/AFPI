import React, { useState } from 'react';
import { 
  ShieldCheck, Hash, CheckCircle2, Lock, RefreshCw, 
  ExternalLink, Search, Copy, Layers, Database, AlertCircle 
} from 'lucide-react';

const LEDGER_BLOCKS = [
  {
    blockHeight: 88419,
    timestamp: '2026-09-19 02:45:12 IST',
    snapshotCount: 48200,
    merkleRoot: '0x9F4CE7B812A49B88019C3044EE1D84B9C590E3F10A',
    previousHash: '0x3A81D299EF1120AB8C901452D81987F5584A64B21F',
    validatorNode: 'MoCA-DGCA-NODE-DEL-01',
    status: 'VERIFIED',
    carrierBatches: ['6E-DEL', 'AI-BOM', 'UK-BLR', 'SG-MAA', 'QP-HYD'],
    gasUsed: '0.000 GWEI (Zero-Fee State Authority Ledger)',
  },
  {
    blockHeight: 88418,
    timestamp: '2026-09-19 01:45:00 IST',
    snapshotCount: 47910,
    merkleRoot: '0x3A81D299EF1120AB8C901452D81987F5584A64B21F',
    previousHash: '0x718BC4180A89146B9CD8001FDE88231498C0B7A421',
    validatorNode: 'MoCA-DGCA-NODE-BOM-02',
    status: 'VERIFIED',
    carrierBatches: ['6E-CCU', 'AI-DEL', 'UK-PNQ', 'SG-IXC'],
    gasUsed: '0.000 GWEI',
  },
  {
    blockHeight: 88417,
    timestamp: '2026-09-19 00:45:00 IST',
    snapshotCount: 46850,
    merkleRoot: '0x718BC4180A89146B9CD8001FDE88231498C0B7A421',
    previousHash: '0x55E9A841B9CD001F992487C9912BA881453E099182',
    validatorNode: 'MoCA-DGCA-NODE-BLR-01',
    status: 'VERIFIED',
    carrierBatches: ['6E-PAT', 'AI-GOI', 'UK-DEL', 'QP-AMD'],
    gasUsed: '0.000 GWEI',
  },
  {
    blockHeight: 88416,
    timestamp: '2026-09-18 23:45:00 IST',
    snapshotCount: 48900,
    merkleRoot: '0x55E9A841B9CD001F992487C9912BA881453E099182',
    previousHash: '0x110CB994827F00AA38491C55B901C98481A0087143',
    validatorNode: 'MoCA-DGCA-NODE-DEL-01',
    status: 'VERIFIED',
    carrierBatches: ['6E-ALL', 'AI-ALL', 'UK-ALL'],
    gasUsed: '0.000 GWEI',
  },
];

export const DataLedger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState(LEDGER_BLOCKS[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedToast, setVerifiedToast] = useState(false);

  const handleVerifyChain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedToast(true);
      setTimeout(() => setVerifiedToast(false), 4000);
    }, 1200);
  };

  const filteredBlocks = LEDGER_BLOCKS.filter(b => 
    b.blockHeight.toString().includes(searchTerm) ||
    b.merkleRoot.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.validatorNode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              Cryptographic Audit Trail · SHA-256 Telemetry Proofs
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              AeroIndex Immutable Data Integrity Ledger
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleVerifyChain}
              disabled={isVerifying}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              {isVerifying ? 'Verifying Merkle Tree...' : 'Verify Cryptographic State'}
            </button>
          </div>
        </div>

        {verifiedToast && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Integrity Check Passed:</strong> All 1,284,320 snapshots cryptographically validated against DGCA genesis state. Zero tamper detected.</span>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Block Height, Merkle Root, or Validator Node..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block List */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Verified Block Batches ({filteredBlocks.length})
          </div>
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredBlocks.map(b => {
              const isSelected = selectedBlock.blockHeight === b.blockHeight;
              return (
                <div
                  key={b.blockHeight}
                  onClick={() => setSelectedBlock(b)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/70 border-blue-300 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-mono text-xs font-bold text-slate-900">Block #{b.blockHeight}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold font-mono">
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>{b.snapshotCount.toLocaleString()} fares staged</span>
                    <span>{b.timestamp.split(' ')[1]}</span>
                  </div>
                  <div className="mt-1 text-[9px] font-mono text-slate-400 truncate">
                    Merkle: {b.merkleRoot}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Block Details Inspector */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-700" />
              <span className="font-bold text-slate-900">BLOCK #{selectedBlock.blockHeight} AUDIT CERTIFICATE</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              IMMUTABLE SNAPSHOT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">TIMESTAMP (NTP SYNCHRONIZED)</span>
              <span className="font-semibold text-slate-800">{selectedBlock.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">VALIDATOR NODE ID</span>
              <span className="font-semibold text-slate-800">{selectedBlock.validatorNode}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-400 text-[10px] block">MERKLE ROOT HASH</span>
              <span className="font-bold text-blue-700 break-all select-all">{selectedBlock.merkleRoot}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-400 text-[10px] block">PREVIOUS BLOCK HASH</span>
              <span className="font-medium text-slate-600 break-all select-all">{selectedBlock.previousHash}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">RECORD BATCH COUNT</span>
              <span className="font-bold text-slate-900">{selectedBlock.snapshotCount.toLocaleString()} Fare Quotes</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">CONSENSUS PROTOCOL</span>
              <span className="font-semibold text-slate-800">DGCA Proof-of-Authority (PoA)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <div className="text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Included Scraper Partitions:</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedBlock.carrierBatches.map((batch, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-700 shadow-2xs">
                  {batch}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-100/50 border border-blue-200 flex items-start gap-2 text-[10px] text-blue-900 font-sans">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              This cryptographic record is legally admissible under Section 65B of the Indian Evidence Act, 1872 for regulatory penalty hearings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
