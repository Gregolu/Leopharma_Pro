sed -i '' -e '/export class PatientProtocolComponent {/a\
  getVignetteClass(name: string): string {\
    const n = name.toLowerCase();\
    if (n.includes("sévère")) return "vignette-severe";\
    if (n.includes("modéré")) return "vignette-modere";\
    if (n.includes("alpha") || n.includes("trial a")) return "vignette-trial-a";\
    if (n.includes("beta")) return "vignette-beta";\
    if (n.includes("ecp-4")) return "vignette-ecp4";\
    if (n.includes("eczemalife")) return "vignette-eczemalife";\
    if (n.includes("elaris")) return "vignette-elaris";\
    if (n.includes("exogen")) return "vignette-exogen";\
    if (n.includes("aucun") || n.includes("non diagn")) return "vignette-none";\
    return "vignette-other-study";\
  }\
' src/app/pages/patients/patient-protocol/patient-protocol.component.ts
