import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@heroui/tooltip";
import { clsx } from "clsx";

// Config & Data
import { initialMalls, initialSpots } from "@/config/parking-data";

export default function SmartParkingPage() {
  const navigate = useNavigate();
  const [malls, setMalls] = useState(initialMalls);
  const [parkingSpots] = useState(initialSpots);
  const [searchTerm] = useState("");

  useEffect(() => {
    setMalls((prevMalls) =>
      prevMalls.map((mall) => {
        const spots = parkingSpots[mall.id] || [];
        const available = spots.filter(
          (s) => s.status === "available" && (s.type !== "vip" || !s.reserved),
        ).length;
        return { ...mall, availableSpots: available };
      }),
    );
  }, [parkingSpots]);

  const filteredMalls = useMemo(() => {
    return malls.filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [malls, searchTerm]);

  const handleSelectMall = (id) => {
    navigate(`/mall/${id}`);
  };

  return (
    <main className="animate-fadeIn">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMalls.map((mall) => {
            const isDisabled =
              mall.id === "itec-mall" || mall.id === "vientiane-center";

            return (
              <Card
                key={mall.id}
                isPressable={!isDisabled}
                className={clsx(
                  "bg-[#141b3d]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden transition-all group relative h-full flex flex-col",
                  isDisabled
                    ? "cursor-not-allowed border-white/5"
                    : "hover:translate-y-[-8px] hover:border-blue-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]",
                )}
                onClick={() => !isDisabled && handleSelectMall(mall.id)}
              >
                {isDisabled && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#141b3d]/80 backdrop-blur-md p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                      <svg
                        className="w-16 h-16 text-yellow-500 relative animate-spin-slow"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold font-['Noto_Sans_Lao'] text-white mb-2 shadow-sm">
                      ກຳລັງພັດທະນາຢູ່
                    </h4>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/10">
                      COMING SOON
                    </span>
                  </div>
                )}

                <CardHeader className="p-0 h-48 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  {mall.image ? (
                    <img
                      src={mall.image}
                      alt={mall.name}
                      className={clsx(
                        "object-cover w-full h-full transition-transform duration-700",
                        !isDisabled && "group-hover:scale-110",
                      )}
                    />
                  ) : (
                    <span className="text-6xl">{mall.icon}</span>
                  )}
                  <div
                    className={clsx(
                      "absolute inset-0 bg-black/20 opacity-0 transition-opacity",
                      !isDisabled && "group-hover:opacity-100",
                    )}
                  />
                </CardHeader>

                <CardBody className="p-8 space-y-6 flex-grow">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-['Noto_Sans_Lao'] text-white">
                      {mall.name}
                    </h3>
                    <p className="text-white/30 text-xs tracking-wide">
                      {isDisabled ? "Development In Progress" : "Available Now"}
                    </p>
                  </div>

                  <div className="flex gap-8 pt-2">
                    <div className="space-y-1">
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                        ທີ່ວ່າງ
                      </p>
                      <p className="text-2xl font-bold text-green-400">
                        {mall.availableSpots}/{mall.totalSpots}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                        VIP
                      </p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {mall.vipSpots}
                      </p>
                    </div>
                  </div>

                  {!isDisabled && (
                    <div className="pt-4 flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:gap-4 transition-all mt-auto">
                      <span>ຈັດການບ່ອນຈອດ</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
