'use client';

export default function FallingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Continuous stream of leaves - like the working lizard-tapper version */}
      
      {/* Row 1 - quick falls */}
      <div className="absolute text-sm opacity-60" style={{ left: '5%', color: '#22c55e', animation: 'leafFallSway 8s linear infinite' }}>🍃</div>
      <div className="absolute text-sm opacity-50" style={{ left: '15%', color: '#16a34a', animation: 'leafFallSway 10s linear infinite', animationDelay: '1s' }}>🌿</div>
      <div className="absolute text-xs opacity-40" style={{ left: '25%', color: '#10b981', animation: 'leafFallSway 12s linear infinite', animationDelay: '2s' }}>🍀</div>
      <div className="absolute text-sm opacity-55" style={{ left: '35%', color: '#86efac', animation: 'leafFallSway 9s linear infinite', animationDelay: '0.5s' }}>🌾</div>
      <div className="absolute text-xs opacity-45" style={{ left: '45%', color: '#22c55e', animation: 'leafFallSway 11s linear infinite', animationDelay: '3s' }}>🌱</div>
      <div className="absolute text-sm opacity-50" style={{ left: '55%', color: '#16a34a', animation: 'leafFallSway 13s linear infinite', animationDelay: '1.5s' }}>🍃</div>
      <div className="absolute text-xs opacity-60" style={{ left: '65%', color: '#10b981', animation: 'leafFallSway 7s linear infinite', animationDelay: '4s' }}>🌿</div>
      <div className="absolute text-sm opacity-40" style={{ left: '75%', color: '#86efac', animation: 'leafFallSway 14s linear infinite', animationDelay: '2.5s' }}>🍀</div>
      <div className="absolute text-xs opacity-55" style={{ left: '85%', color: '#22c55e', animation: 'leafFallSway 9s linear infinite', animationDelay: '0.8s' }}>🌾</div>
      <div className="absolute text-sm opacity-45" style={{ left: '95%', color: '#16a34a', animation: 'leafFallSway 12s linear infinite', animationDelay: '3.5s' }}>🌱</div>
      
      {/* Row 2 - offset positions for denser effect */}
      <div className="absolute text-xs opacity-50" style={{ left: '8%', color: '#10b981', animation: 'leafFallSway 10s linear infinite', animationDelay: '5s' }}>🍃</div>
      <div className="absolute text-sm opacity-40" style={{ left: '18%', color: '#86efac', animation: 'leafFallSway 8s linear infinite', animationDelay: '6s' }}>🌿</div>
      <div className="absolute text-xs opacity-60" style={{ left: '28%', color: '#22c55e', animation: 'leafFallSway 11s linear infinite', animationDelay: '7s' }}>🍀</div>
      <div className="absolute text-sm opacity-45" style={{ left: '38%', color: '#16a34a', animation: 'leafFallSway 13s linear infinite', animationDelay: '6.5s' }}>🌾</div>
      <div className="absolute text-xs opacity-55" style={{ left: '48%', color: '#10b981', animation: 'leafFallSway 9s linear infinite', animationDelay: '8s' }}>🌱</div>
      <div className="absolute text-sm opacity-50" style={{ left: '58%', color: '#86efac', animation: 'leafFallSway 7s linear infinite', animationDelay: '5.5s' }}>🍃</div>
      <div className="absolute text-xs opacity-40" style={{ left: '68%', color: '#22c55e', animation: 'leafFallSway 12s linear infinite', animationDelay: '9s' }}>🌿</div>
      <div className="absolute text-sm opacity-60" style={{ left: '78%', color: '#16a34a', animation: 'leafFallSway 10s linear infinite', animationDelay: '7.5s' }}>🍀</div>
      <div className="absolute text-xs opacity-45" style={{ left: '88%', color: '#10b981', animation: 'leafFallSway 14s linear infinite', animationDelay: '8.5s' }}>🌾</div>
      
      {/* Row 3 - even more density */}
      <div className="absolute text-sm opacity-35" style={{ left: '12%', color: '#86efac', animation: 'leafFallSway 6s linear infinite', animationDelay: '10s' }}>🍃</div>
      <div className="absolute text-xs opacity-45" style={{ left: '22%', color: '#22c55e', animation: 'leafFallSway 15s linear infinite', animationDelay: '11s' }}>🌿</div>
      <div className="absolute text-sm opacity-50" style={{ left: '32%', color: '#16a34a', animation: 'leafFallSway 9s linear infinite', animationDelay: '12s' }}>🍀</div>
      <div className="absolute text-xs opacity-40" style={{ left: '42%', color: '#10b981', animation: 'leafFallSway 11s linear infinite', animationDelay: '10.5s' }}>🌾</div>
      <div className="absolute text-sm opacity-55" style={{ left: '52%', color: '#86efac', animation: 'leafFallSway 8s linear infinite', animationDelay: '13s' }}>🌱</div>
      <div className="absolute text-xs opacity-50" style={{ left: '62%', color: '#22c55e', animation: 'leafFallSway 12s linear infinite', animationDelay: '11.5s' }}>🍃</div>
      <div className="absolute text-sm opacity-40" style={{ left: '72%', color: '#16a34a', animation: 'leafFallSway 7s linear infinite', animationDelay: '14s' }}>🌿</div>
      <div className="absolute text-xs opacity-60" style={{ left: '82%', color: '#10b981', animation: 'leafFallSway 13s linear infinite', animationDelay: '12.5s' }}>🍀</div>
      <div className="absolute text-sm opacity-45" style={{ left: '92%', color: '#86efac', animation: 'leafFallSway 10s linear infinite', animationDelay: '15s' }}>🌾</div>
      
      {/* Row 4 - final layer */}
      <div className="absolute text-xs opacity-30" style={{ left: '3%', color: '#22c55e', animation: 'leafFallSway 14s linear infinite', animationDelay: '16s' }}>🍃</div>
      <div className="absolute text-sm opacity-40" style={{ left: '13%', color: '#16a34a', animation: 'leafFallSway 6s linear infinite', animationDelay: '17s' }}>🌿</div>
      <div className="absolute text-xs opacity-55" style={{ left: '23%', color: '#10b981', animation: 'leafFallSway 11s linear infinite', animationDelay: '18s' }}>🍀</div>
      <div className="absolute text-sm opacity-35" style={{ left: '33%', color: '#86efac', animation: 'leafFallSway 9s linear infinite', animationDelay: '16.5s' }}>🌾</div>
      <div className="absolute text-xs opacity-50" style={{ left: '43%', color: '#22c55e', animation: 'leafFallSway 12s linear infinite', animationDelay: '19s' }}>🌱</div>
      <div className="absolute text-sm opacity-45" style={{ left: '53%', color: '#16a34a', animation: 'leafFallSway 8s linear infinite', animationDelay: '17.5s' }}>🍃</div>
      <div className="absolute text-xs opacity-40" style={{ left: '63%', color: '#10b981', animation: 'leafFallSway 15s linear infinite', animationDelay: '20s' }}>🌿</div>
      <div className="absolute text-sm opacity-60" style={{ left: '73%', color: '#86efac', animation: 'leafFallSway 7s linear infinite', animationDelay: '18.5s' }}>🍀</div>
      <div className="absolute text-xs opacity-35" style={{ left: '83%', color: '#22c55e', animation: 'leafFallSway 13s linear infinite', animationDelay: '21s' }}>🌾</div>
      <div className="absolute text-sm opacity-50" style={{ left: '93%', color: '#16a34a', animation: 'leafFallSway 10s linear infinite', animationDelay: '19.5s' }}>🌱</div>
    </div>
  );
}