// // // "use client";

// // // import { motion } from "framer-motion";
// // // import {
// // //   ShieldCheck,
// // //   MapPin,
// // //   Gift,
// // //   Lock,
// // //   ArrowRight,
// // //   Rocket,
// // // } from "lucide-react";

// // // import Button from "@/components/ui/Button";
// // // import Badge from "@/components/ui/Badge";
// // // import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";

// // // const heroFeatures = [
// // //   { icon: Gift, label: "Free Registration" },
// // //   { icon: ShieldCheck, label: "Verified Professionals" },
// // //   { icon: MapPin, label: "Pan-India Coverage" },
// // //   { icon: Lock, label: "Secure & Private" },
// // // ];

// // // export default function Hero() {
// // //   return (
// // //     <section className="relative bg-navy overflow-hidden">
// // //       {/* Background Pattern */}
// // //       <div className="absolute inset-0 opacity-5">
// // //         <div
// // //           className="absolute inset-0"
// // //           style={{
// // //             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// // //           }}
// // //         />
// // //       </div>

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
// // //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

// // //           {/* LEFT SIDE */}
// // //           <motion.div
// // //             initial={{ opacity: 0, x: -40 }}
// // //             animate={{ opacity: 1, x: 0 }}
// // //             transition={{
// // //               duration: 0.8,
// // //               ease: "easeOut",
// // //             }}
// // //             className="relative z-10"
// // //           >
// // //             {/* Badge */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{
// // //                 delay: 0.2,
// // //                 duration: 0.6,
// // //               }}
// // //             >
// // //               <Badge variant="accent" className="mb-6">
// // //                 <Rocket
// // //                   className="mr-2 h-3.5 w-3.5"
// // //                   strokeWidth={2}
// // //                 />
// // //                 Now Accepting Registrations
// // //               </Badge>
// // //             </motion.div>

// // //             {/* Heading */}
// // //             <motion.h1
// // //               initial={{ opacity: 0, y: 30 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{
// // //                 delay: 0.3,
// // //                 duration: 0.7,
// // //               }}
// // //               className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
// // //             >
// // //               Where Construction{" "}
// // //               <span className="text-accent">Projects</span> Meet{" "}
// // //               <span className="text-accent">
// // //                 Trusted Professionals
// // //               </span>
// // //             </motion.h1>

// // //             {/* Description */}
// // //             <motion.p
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{
// // //                 delay: 0.5,
// // //                 duration: 0.6,
// // //               }}
// // //               className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
// // //             >
// // //               India's premier marketplace connecting verified
// // //               construction professionals with clients. Hire site
// // //               supervisors, engineers, architects, and more — all in
// // //               one place.
// // //             </motion.p>

// // //             {/* Buttons */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{
// // //                 delay: 0.6,
// // //                 duration: 0.6,
// // //               }}
// // //               className="flex flex-col sm:flex-row gap-4 mb-10"
// // //             >
// // //               <Button size="lg" className="group">
// // //                 Hire Professionals
// // //                 <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
// // //               </Button>

// // //               <JoinAsProfessionalButton
// // //                 variant="outline"
// // //                 size="lg"
// // //               />
// // //             </motion.div>

// // //             {/* Features */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{
// // //                 delay: 0.8,
// // //                 duration: 0.6,
// // //               }}
// // //               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
// // //             >
// // //               {heroFeatures.map((feature) => {
// // //                 const Icon = feature.icon;

// // //                 return (
// // //                   <div
// // //                     key={feature.label}
// // //                     className="flex items-center gap-2 text-white/60"
// // //                   >
// // //                     <Icon className="h-4 w-4 text-accent shrink-0" />

// // //                     <span className="text-xs font-medium">
// // //                       {feature.label}
// // //                     </span>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </motion.div>
// // //           </motion.div>

// // //           {/* RIGHT SIDE */}
// // //           <motion.div
// // //             initial={{ opacity: 0, x: 40 }}
// // //             animate={{ opacity: 1, x: 0 }}
// // //             transition={{
// // //               duration: 0.8,
// // //               delay: 0.3,
// // //               ease: "easeOut",
// // //             }}
// // //             className="relative hidden lg:block"
// // //           >
// // //             {/* Main floating animation */}
// // //             <motion.div
// // //               animate={{
// // //                 y: [0, -20, 0],
// // //               }}
// // //               transition={{
// // //                 duration: 6,
// // //                 repeat: Infinity,
// // //                 ease: "easeInOut",
// // //               }}
// // //               className="relative"
// // //             >
// // //               {/* Image Card */}
// // //               <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 shadow-2xl">

// // //                 {/* Cloudinary Image */}
// // //               <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
// // //                 <img
// // //                   src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png?auto=format&w=1400&q=80"
// // //                   alt="Construction professionals"
// // //                   className="h-full w-full object-contain"
// // //                 />

// // //                 <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />
// // //               </div>

// // //                 {/* VERIFIED CARD */}
// // //                 <motion.div
// // //                   animate={{
// // //                     y: [0, -10, 0],
// // //                     rotate: [0, 5, 0],
// // //                   }}
// // //                   transition={{
// // //                     duration: 4,
// // //                     repeat: Infinity,
// // //                     ease: "easeInOut",
// // //                   }}
// // //                   className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-card"
// // //                 >
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
// // //                       <ShieldCheck
// // //                         className="h-4 w-4 text-accent"
// // //                         strokeWidth={2}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <p className="text-xs font-bold text-text">
// // //                         Verified
// // //                       </p>

// // //                       <p className="text-[10px] text-secondary-text">
// // //                         Professionals
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>

// // //                 {/* ALL INDIA CARD */}
// // //                 <motion.div
// // //                   animate={{
// // //                     y: [0, 10, 0],
// // //                     rotate: [0, -5, 0],
// // //                   }}
// // //                   transition={{
// // //                     duration: 5,
// // //                     repeat: Infinity,
// // //                     ease: "easeInOut",
// // //                     delay: 1,
// // //                   }}
// // //                   className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-card"
// // //                 >
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
// // //                       <MapPin
// // //                         className="h-4 w-4 text-navy"
// // //                         strokeWidth={2}
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <p className="text-xs font-bold text-text">
// // //                         28 States
// // //                       </p>

// // //                       <p className="text-[10px] text-secondary-text">
// // //                         All India
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>

// // //               </div>
// // //             </motion.div>
// // //           </motion.div>

// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import { motion } from "framer-motion";
// // import {
// //   ShieldCheck,
// //   MapPin,
// //   Gift,
// //   Lock,
// //   Building2,
// //   ArrowRight,
// // } from "lucide-react";
// // import Link from "next/link";
// // import Button from "@/components/ui/Button";
// // import Badge from "@/components/ui/Badge";
// // import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";
// // import { Rocket } from "lucide-react";

// // const heroFeatures = [
// //   { icon: Gift, label: "Free Registration" },
// //   { icon: ShieldCheck, label: "Verified Professionals" },
// //   { icon: MapPin, label: "Pan-India Coverage" },
// //   { icon: Lock, label: "Secure & Private" },
// // ];

// // export default function Hero() {
// //   return (
// //     <section className="relative bg-navy overflow-hidden">
// //       <div className="absolute inset-0 opacity-5">
// //         <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
// //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// //           <motion.div
// //             initial={{ opacity: 0, x: -40 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8, ease: "easeOut" }}
// //             className="relative z-10"
// //           >
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.2, duration: 0.6 }}
// //             >
// //               <Badge variant="accent" className="mb-6">
// //                 <Rocket className="mr-2 h-3.5 w-3.5" strokeWidth={2} />
// //                 Now Accepting Registrations
// //               </Badge>
// //             </motion.div>

// //             <motion.h1
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.3, duration: 0.7 }}
// //               className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
// //             >
// //               Where Construction{" "}
// //               <span className="text-accent">Projects</span> Meet{" "}
// //               <span className="text-accent">Trusted Professionals</span>
// //             </motion.h1>

// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.5, duration: 0.6 }}
// //               className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
// //             >
// //               India's premier marketplace connecting verified construction
// //               professionals with clients. Hire site supervisors, engineers,
// //               architects, and more – all in one place.
// //             </motion.p>

// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.6, duration: 0.6 }}
// //               className="flex flex-col sm:flex-row gap-4 mb-10"
// //             >
// //               <Link href="/hire-professional">
// //                 <Button size="lg" className="group">
// //                   Hire Professionals
// //                   <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
// //                 </Button>
// //               </Link>
// //               <JoinAsProfessionalButton variant="outline" size="lg" />
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.8, duration: 0.6 }}
// //               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
// //             >
// //               {heroFeatures.map((feature) => (
// //                 <div
// //                   key={feature.label}
// //                   className="flex items-center gap-2 text-white/60"
// //                 >
// //                   <feature.icon className="h-4 w-4 text-accent shrink-0" />
// //                   <span className="text-xs font-medium">{feature.label}</span>
// //                 </div>
// //               ))}
// //             </motion.div>
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: 40 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
// //             className="relative hidden lg:block"
// //           >
// //             <motion.div
// //               animate={{ y: [0, -20, 0] }}
// //               transition={{
// //                 duration: 6,
// //                 repeat: Infinity,
// //                 ease: "easeInOut",
// //               }}
// //               className="relative"
// //             >
// //               <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
// //                   {/* Cloudinary Image */}
// //                   <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
// //                     <img
// //                       src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png?auto=format&w=1400&q=80"
// //                       alt="Construction professionals"
// //                       className="h-full w-full object-contain"
// //                     />

// //                     <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />
// //                   </div>
// //                 <motion.div
// //                   animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
// //                   transition={{
// //                     duration: 4,
// //                     repeat: Infinity,
// //                     ease: "easeInOut",
// //                   }}
// //                   className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-card"
// //                 >
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
// //                       <ShieldCheck className="h-4 w-4 text-accent" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs font-bold text-text">Verified</p>
// //                       <p className="text-[10px] text-secondary-text">
// //                         Professionals
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //                 <motion.div
// //                   animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
// //                   transition={{
// //                     duration: 5,
// //                     repeat: Infinity,
// //                     ease: "easeInOut",
// //                     delay: 1,
// //                   }}
// //                   className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-card"
// //                 >
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
// //                       <MapPin className="h-4 w-4 text-navy" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs font-bold text-text">28 States</p>
// //                       <p className="text-[10px] text-secondary-text">
// //                         All India
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import {
//   ShieldCheck,
//   MapPin,
//   Gift,
//   Lock,
//   Building2,
//   ArrowRight,
// } from "lucide-react";
// import Link from "next/link";
// import Button from "@/components/ui/Button";
// import Badge from "@/components/ui/Badge";
// import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";
// import { Rocket } from "lucide-react";

// const heroFeatures = [
//   { icon: Gift, label: "Free Registration" },
//   { icon: ShieldCheck, label: "Verified Professionals" },
//   { icon: MapPin, label: "Pan-India Coverage" },
//   { icon: Lock, label: "Secure & Private" },
// ];

// export default function Hero() {
//   return (
//     <section className="relative bg-navy overflow-hidden">
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="relative z-10"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//             >
//               <Badge variant="accent" className="mb-6">
//                 <Rocket className="mr-2 h-3.5 w-3.5" strokeWidth={2} />
//                 Now Accepting Registrations
//               </Badge>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.7 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
//             >
//               Where Construction{" "}
//               <span className="text-accent">Projects</span> Meet{" "}
//               <span className="text-accent">Trusted Professionals</span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//               className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
//             >
//               India's premier marketplace connecting verified construction
//               professionals with clients. Hire site supervisors, engineers,
//               architects, and more – all in one place.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.6 }}
//               className="flex flex-col sm:flex-row gap-4 mb-10"
//             >
//               <Link href="/hire-professional">
//                 <Button size="lg" className="group">
//                   Hire Professionals
//                   <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <JoinAsProfessionalButton variant="outline" size="lg" />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
//             >
//               {heroFeatures.map((feature) => (
//                 <div
//                   key={feature.label}
//                   className="flex items-center gap-2 text-white/60"
//                 >
//                   <feature.icon className="h-4 w-4 text-accent shrink-0" />
//                   <span className="text-xs font-medium">{feature.label}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//             className="relative hidden lg:block"
//           >
//             <motion.div
//               animate={{ y: [0, -20, 0] }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="relative"
//             >
//               <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
//                 <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
//                   <img
//                     src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png?auto=format&w=1400&q=80"
//                     alt="Construction professionals"
//                     className="h-full w-full object-contain"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />
//                 </div>
//                 <motion.div
//                   animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-card"
//                 >
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
//                       <ShieldCheck className="h-4 w-4 text-accent" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-text">Verified</p>
//                       <p className="text-[10px] text-secondary-text">
//                         Professionals
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
//                   transition={{
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                   className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-card"
//                 >
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-navy" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-text">28 States</p>
//                       <p className="text-[10px] text-secondary-text">All India</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Gift,
  Lock,
  ArrowRight,
  Rocket,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import JoinAsProfessionalButton from "@/components/auth/JoinAsProfessionalButton";

const heroFeatures = [
  {
    icon: Gift,
    label: "Free Registration",
  },
  {
    icon: ShieldCheck,
    label: "Verified Professionals",
  },
  {
    icon: MapPin,
    label: "Pan-India Coverage",
  },
  {
    icon: Lock,
    label: "Secure & Private",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-navy overflow-hidden">

      {/* ==========================================
          BACKGROUND PATTERN
      ========================================== */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10"
          >

            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
            >
              <Badge
                variant="accent"
                className="mb-6"
              >
                <Rocket
                  className="mr-2 h-3.5 w-3.5"
                  strokeWidth={2}
                />

                Now Accepting Registrations
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Where Construction{" "}

              <span className="text-accent">
                Projects
              </span>{" "}

              Meet{" "}

              <span className="text-accent">
                Trusted Professionals
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
            >
              India's premier marketplace connecting verified
              construction professionals with clients. Hire site
              supervisors, engineers, architects, and more — all in
              one place.
            </motion.p>

            {/* ==========================================
                RESPONSIVE BUTTONS
            ========================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
                duration: 0.6,
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 w-full"
            >

              {/* Hire Professionals */}
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto justify-center"
                >
                  Hire Professionals

                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Join as Professional */}
              <div className="w-full sm:w-auto">
                <JoinAsProfessionalButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                />
              </div>

            </motion.div>

            {/* Features */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {heroFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 text-white/60"
                  >
                    <Icon className="h-4 w-4 text-accent shrink-0" />

                    <span className="text-xs font-medium">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

          </motion.div>

          {/* ==========================================
              RIGHT SIDE IMAGE
          ========================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="relative hidden lg:block"
          >

            {/* Main floating animation */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >

              {/* Image Card */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-3 border border-white/10 shadow-2xl">

                {/* ==========================================
                    CLOUDINARY IMAGE
                ========================================== */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">

                  <img
                    src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png?auto=format&w=1400&q=80"
                    alt="Construction professionals"
                    className="h-full w-full object-contain"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />

                </div>

                {/* ==========================================
                    VERIFIED CARD
                ========================================== */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-card"
                >
                  <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShieldCheck
                        className="h-4 w-4 text-accent"
                        strokeWidth={2}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-text">
                        Verified
                      </p>

                      <p className="text-[10px] text-secondary-text">
                        Professionals
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* ==========================================
                    ALL INDIA CARD
                ========================================== */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-card"
                >
                  <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                      <MapPin
                        className="h-4 w-4 text-navy"
                        strokeWidth={2}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-text">
                        28 States
                      </p>

                      <p className="text-[10px] text-secondary-text">
                        All India
                      </p>
                    </div>

                  </div>
                </motion.div>

              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}