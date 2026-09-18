import React, { useState } from 'react';
import { 
  FileText, ShieldAlert, Download, Printer, CheckCircle2, 
  AlertOctagon, X, Stamp, Copy, ExternalLink, Calendar, Hash
} from 'lucide-react';

export const NoticeGenerator = ({ eventData, isOpen, onClose }) => {
  if (!isOpen) return null;

  const data = eventData || {
    id: 'GEV-2026-0901',
    carrier: 'IndiGo (InterGlobe Aviation Ltd.)',
    route: 'DEL-PAT (New Delhi to Patna)',
    surge: 62,
    avgFare: 4200,
    surgedFare: 6804,
    date: '2026-09-18',
    trigger: 'Chhath Puja Festival Window',
    marketShare: 68
  };

  const [copied, setCopied] = useState(false);
  const [issued, setIssued] = useState(false);

  const noticeRefNo = `DGCA/AERO-AUDIT/2026/SCN-${data.id.split('-').pop() || '8841'}`;
  const issuanceDate = '19 September 2026';
  const complianceDeadline = '26 September 2026 (17:00 IST)';

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeRefNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-red-400 uppercase tracking-wider">OFFICIAL DGCA ENFORCEMENT ACTION</span>
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold">ARC §4.2(B)</span>
              </div>
              <h2 className="text-sm font-bold text-white mt-0.5">Show-Cause Notice Generation &amp; Statutory Dispatch</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action ribbon */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
            <span>Dispatch Ref: <strong>{noticeRefNo}</strong></span>
            <button 
              onClick={handleCopy}
              className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500"
              title="Copy Reference Number"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Notice
            </button>
            <button
              onClick={() => setIssued(true)}
              disabled={issued}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-2xs ${
                issued 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {issued ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> DISPATCHED TO CARRIER
                </>
              ) : (
                <>
                  <Stamp className="w-3.5 h-3.5" /> ISSUE &amp; SEAL NOTICE
                </>
              )}
            </button>
          </div>
        </div>

        {/* Official Document Body */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50 space-y-6 text-slate-800 font-serif">
          {/* Header of official notice */}
          <div className="text-center space-y-1 pb-4 border-b border-slate-300 font-sans">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-widest">GOVERNMENT OF INDIA</div>
            <div className="text-sm font-bold text-slate-900 uppercase">DIRECTORATE GENERAL OF CIVIL AVIATION (DGCA)</div>
            <div className="text-[11px] text-slate-600">Aurobindo Marg, Opp. Safdarjung Airport, New Delhi – 110003</div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">Air Transport Regulatory &amp; Tariff Surveillance Division</div>
          </div>

          {/* Notice Metadata */}
          <div className="flex justify-between items-start text-xs font-sans text-slate-700">
            <div>
              <div><strong>Notice Ref:</strong> {noticeRefNo}</div>
              <div><strong>Dated:</strong> {issuanceDate}</div>
              <div><strong>Mode:</strong> Instant Telemetry Dispatch + Regd. AD</div>
            </div>
            <div className="text-right">
              <div><strong>Statutory Deadline:</strong> {complianceDeadline}</div>
              <div className="text-red-700 font-bold">URGENT / TIME BOUND</div>
            </div>
          </div>

          {/* Addressee */}
          <div className="text-xs font-sans text-slate-800 leading-relaxed">
            <div className="font-bold uppercase">To:</div>
            <div>The Chief Executive Officer / Commercial Director</div>
            <div><strong>{data.carrier}</strong></div>
            <div>Domestic Operations Division, India</div>
          </div>

          {/* Subject Line */}
          <div className="text-xs font-sans font-bold bg-amber-50 border border-amber-200 p-2.5 rounded text-amber-950">
            SUBJECT: SHOW-CAUSE NOTICE UNDER RULE 135 &amp; SECTION 4.2(B) OF THE AIRCRAFT RULES, 1937 FOR ABNORMAL &amp; UNJUSTIFIED FARE SURGE ON SECTOR {data.route}.
          </div>

          {/* Notice Paragraphs */}
          <div className="text-xs leading-relaxed space-y-3 font-sans text-slate-700 text-justify">
            <p>
              1. <strong>WHEREAS</strong>, continuous automated market tariff telemetry conducted by the DGCA AeroIndex National Surveillance System on date <strong>{data.date}</strong> has identified an abnormal surge of <strong>+{data.surge}%</strong> on the scheduled domestic route <strong>{data.route}</strong> during the high-demand period of <em>{data.trigger}</em>.
            </p>
            <p>
              2. <strong>WHEREAS</strong>, against the benchmark seasonal median ceiling of <strong>₹{data.avgFare.toLocaleString()}</strong>, your airline published economy seat inventory at <strong>₹{data.surgedFare.toLocaleString()}</strong> while controlling an estimated <strong>{data.marketShare}%</strong> dominant capacity share on this corridor.
            </p>
            <p>
              3. <strong>WHEREAS</strong>, such pricing velocity indicates prima facie non-adherence to the cost-plus-reasonable-profit principles stipulated under civil aviation regulatory mandates, causing extreme passenger welfare detriment and economic artificial gouging.
            </p>
            <p>
              4. <strong>NOW THEREFORE</strong>, you are hereby called upon to show cause within <strong>7 days</strong> (no later than {complianceDeadline}) as to why appropriate punitive action including cancellation of slot authorizations or imposition of compensatory tariff restitution under the Aircraft Act, 1934 should not be initiated against your carrier.
            </p>
          </div>

          {/* Signatory */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end font-sans">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-400">Cryptographic Seal ID: SHA256-8841-SCN-X9</div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                <Hash className="w-3 h-3 text-slate-400" /> SEAL-VERIFIED: MOCA-DGCA-NODE-8841
              </div>
            </div>
            <div className="text-right space-y-0.5 text-xs text-slate-800">
              <div className="font-bold">Harsh Jaiswal</div>
              <div className="text-[11px] text-slate-600">Senior Director &amp; Chief Aviation Intelligence Officer</div>
              <div className="text-[10px] text-slate-500">Directorate General of Civil Aviation, Govt. of India</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Official Government Record • Confidential Regulatory Transmission</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
