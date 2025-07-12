"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CouponInputProps {
  packageId: number;
  userId: string;
  onCouponApplied: (coupon: any, calculation: any) => void;
  onCouponRemoved: () => void;
  disabled?: boolean;
}

export default function CouponInput({ 
  packageId, 
  userId, 
  onCouponApplied, 
  onCouponRemoved, 
  disabled = false 
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Írj be egy kupon kódot');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          couponCode: couponCode.trim(),
          packageId,
          userId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAppliedCoupon(data.coupon);
        onCouponApplied(data.coupon, data.calculation);
        setError('');
      } else {
        setError(data.error || 'Ismeretlen hiba');
      }
    } catch (error) {
      setError('Hálózati hiba');
    } finally {
      setIsLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setError('');
    onCouponRemoved();
  };

  return (
    <div className="space-y-4 p-4 bg-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎫</span>
        <h3 className="text-lg font-semibold text-white">Kupon kód</h3>
      </div>
      
      {!appliedCoupon ? (
        <div className="space-y-3">
          <div>
            <Label htmlFor="coupon-code" className="text-sm font-medium text-gray-300">
              Kupon kód
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="coupon-code"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="pl. SAVE20"
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                disabled={disabled || isLoading}
                onKeyPress={(e) => e.key === 'Enter' && validateCoupon()}
              />
              <Button
                onClick={validateCoupon}
                disabled={disabled || isLoading || !couponCode.trim()}
                className="bg-primary-turquoise hover:bg-primary-turquoise/90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ellenőrzés...</span>
                  </div>
                ) : (
                  'Alkalmazás'
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <span>❌</span>
                {error}
              </p>
            </div>
          )}

          <div className="text-xs text-gray-400 space-y-1">
            <p>💡 Tippek a kupon kódokhoz:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>A kupon kódok nagybetűsek</li>
              <li>Egy kupon kódot csak egyszer használhatsz</li>
              <li>Ellenőrizd a kupon érvényességi idejét</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-400 flex items-center gap-2">
                  <span>✅</span>
                  {appliedCoupon.name}
                </p>
                <p className="text-sm text-green-300">
                  Kupon kód: <span className="font-mono font-bold">{appliedCoupon.code}</span>
                </p>
              </div>
              <Button
                onClick={removeCoupon}
                variant="outline"
                size="sm"
                className="text-gray-300 hover:text-white border-gray-600 hover:bg-gray-700"
              >
                Eltávolítás
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 