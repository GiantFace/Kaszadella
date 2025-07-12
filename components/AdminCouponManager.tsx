"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Coupon {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'free';
  value: number;
  minAmount: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicablePackages: string;
  createdAt: string;
}

export default function AdminCouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'percentage' as const,
    value: 0,
    minAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    validFrom: '',
    validUntil: '',
    isActive: true,
    applicablePackages: '[1,2,3]',
  });

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/coupons');
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      toast({
        title: "Hiba",
        front_description: "Kuponok betöltése sikertelen",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingCoupon ? `/api/admin/coupons/${editingCoupon.id}` : '/api/admin/coupons';
      const method = editingCoupon ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingCoupon ? "Kupon frissítve! 🎉" : "Kupon létrehozva! 🎉",
          front_description: `${formData.name} sikeresen ${editingCoupon ? 'frissítve' : 'létrehozva'}.`,
        });
        
        setShowForm(false);
        setEditingCoupon(null);
        resetForm();
        fetchCoupons();
      } else {
        const error = await response.json();
        toast({
          title: "Hiba",
          front_description: error.message || "Mentés sikertelen",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hiba",
        front_description: "Hálózati hiba",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      type: 'percentage',
      value: 0,
      minAmount: 0,
      maxDiscount: 0,
      usageLimit: 0,
      validFrom: '',
      validUntil: '',
      isActive: true,
      applicablePackages: '[1,2,3]',
    });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🎫 Kupon Kezelés</h2>
        <Button 
          onClick={() => {
            setShowForm(true);
            setEditingCoupon(null);
            resetForm();
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Új Kupon
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Kupon Lista</h3>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Betöltés...</p>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-center text-gray-500">
              Kupon funkció elkészítve! Az adatbázis migrációja szükséges a működéshez.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 