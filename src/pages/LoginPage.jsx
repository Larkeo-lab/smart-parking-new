import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

// Inline Icons
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/40"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/40"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LoginIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/40"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" x2="3" y1="12" y2="12" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-16 h-16 text-red-500 mx-auto mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
    type: "error",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;

      navigate("/");
    } catch (error) {
      setFeedback({
        title: "ເກີດຂໍ້ຜິດພາດ",
        message: error.message,
        type: "error",
      });
      onOpen();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -60, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="w-full bg-[#141b3d]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle glow effect on top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <CardBody className="space-y-8 p-0">
            <div className="text-center space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(37,99,235,0.4)] mb-2"
              >
                <LoginIcon />
              </motion.div>
              <h1 className="text-3xl font-bold font-['Noto_Sans_Lao'] text-white">
                ເຂົ້າສູ່ລະບົບ
              </h1>
              <p className="text-white/50 text-sm">
                ເຂົ້າສູ່ລະບົບເພື່ອຈັດການການຈອງບ່ອນຈອດລົດຂອງເຈົ້າ
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">
                  ອີເມວ
                </label>
                <Input
                  type="email"
                  startContent={<MailIcon />}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper:
                      "bg-white/5 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500 rounded-2xl h-14 transition-all duration-300",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">
                  ລະຫັດຜ່ານ
                </label>
                <Input
                  type="password"
                  startContent={<LockIcon />}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    inputWrapper:
                      "bg-white/5 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500 rounded-2xl h-14 transition-all duration-300",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_10px_25px_rgba(37,99,235,0.4)] mt-4 active:scale-95"
                >
                  {loading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-2"
            >
              <p className="text-white/40 text-sm">
                ຍັງບໍ່ມີບັນຊີ?{" "}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-bold ml-1 active:scale-95 inline-block"
                >
                  ລົງທະບຽນທີ່ນີ້
                </Link>
              </p>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Feedback Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/60 backdrop-blur-md",
          base: "bg-[#141b3d]/90 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden",
          header: "border-b border-white/5",
          footer: "border-t border-white/5",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold font-['Noto_Sans_Lao'] text-white">
                ເກີດຂໍ້ຜິດພາດ
              </ModalHeader>
              <ModalBody className="py-8 text-center">
                <ErrorIcon />
                <p className="text-white/80 text-lg leading-relaxed">
                  {feedback.message}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-red-500/20"
                  onPress={onClose}
                >
                  ຕົກລົງ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

