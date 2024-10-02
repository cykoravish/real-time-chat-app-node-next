const questionsData = [
    {
        id: 1,
        text: "માનવ રક્તમાં હિમોગ્લોબિનનું મુખ્ય કાર્ય શું છે?",
        options: [
          { id: 1, text: "ઓક્સિજનનો પરિવહન", isCorrect: true },
          { id: 2, text: "જઠરશાયર પ્રવેશ", isCorrect: false },
          { id: 3, text: "હોર્મોનનું નિયમન", isCorrect: false },
          { id: 4, text: "પોષક તત્ત્વોનો શોષણ", isCorrect: false },
        ],
      },
      {
        id: 2,
        text: "જઠરતંત્રમાં સ્ટાર્ચને માલ્ટોઝમાં તોડવા માટે કયું એન્ઝાઇમ જવાબદાર છે?",
        options: [
          { id: 1, text: "પેપ્સિન", isCorrect: false },
          { id: 2, text: "એમાયલેઝ", isCorrect: true },
          { id: 3, text: "લિપેઝ", isCorrect: false },
          { id: 4, text: "ટ્રિપ્સિન", isCorrect: false },
        ],
      },
      {
        id: 3,
        text: "માનવ કિડનીમાં નેફ્રોનનું મુખ્ય કાર્ય શું છે?",
        options: [
          { id: 1, text: "રક્તનું ગાળણ", isCorrect: true },
          { id: 2, text: "હોર્મોન સ્રાવ", isCorrect: false },
          { id: 3, text: "પોષક તત્ત્વોનો શોષણ", isCorrect: false },
          { id: 4, text: "પ્રોટીન સંશ્લેષણ", isCorrect: false },
        ],
      },
      {
        id: 4,
        text: "જંતુઓમાં કઈ પ્રક્રિયા નવી સેલનો વિકાસ કરતી હોય છે?",
        options: [
          { id: 1, text: "માઇટોસિસ", isCorrect: true },
          { id: 2, text: "મીયોસિસ", isCorrect: false },
          { id: 3, text: "જૈવિક ઉત્સર્જન", isCorrect: false },
          { id: 4, text: "ફોટોસિન્થેસિસ", isCorrect: false },
        ],
      },
      {
        id: 5,
        text: "પોષણકર્તા દ્વારા કયા જૈવિક તત્વનું સક્ષમ શોષણ થાય છે?",
        options: [
          { id: 1, text: "કાર્બન ડાયોક્સાઇડ", isCorrect: false },
          { id: 2, text: "નાઇટ્રોજન", isCorrect: true },
          { id: 3, text: "ઓક્સિજન", isCorrect: false },
          { id: 4, text: "હાઇડ્રોજન", isCorrect: false },
        ],
      },
      {
        id: 6,
        text: "માનવ પાચનતંત્રમાં ગ્લાયકોલિસીસની પ્રક્રિયા કયાં શરૂ થાય છે?",
        options: [
          { id: 1, text: "જઠર", isCorrect: false },
          { id: 2, text: "કૃતિમ ઘટકો", isCorrect: false },
          { id: 3, text: "યકૃત", isCorrect: false },
          { id: 4, text: "સાઇટોપ્લાઝમ", isCorrect: true },
        ],
      },
      {
        id: 7,
        text: "વનસ્પતિના પર્ણમાં થતી કઈ ક્રિયા પ્રકાશને કીમિયાઇ ઊર્જામાં ફેરવે છે?",
        options: [
          { id: 1, text: "પ્રકાશ સંશ્લેષણ", isCorrect: true },
          { id: 2, text: "કોષિકાનો ભાગો", isCorrect: false },
          { id: 3, text: "નિદ્રા", isCorrect: false },
          { id: 4, text: "શ્વસન", isCorrect: false },
        ],
      },
      {
        id: 8,
        text: "સામાન્ય માનવ કીડનીમાં રોજ બલ્ક રેખિય ગાળણ કેટલો થાય છે?",
        options: [
          { id: 1, text: "180 લિટર", isCorrect: true },
          { id: 2, text: "100 લિટર", isCorrect: false },
          { id: 3, text: "50 લિટર", isCorrect: false },
          { id: 4, text: "200 લિટર", isCorrect: false },
        ],
      },
      {
        id: 9,
        text: "પ્રતિરક્ષા પદ્ધતિમાં એન્ટિબોડીસની મુખ્ય ભૂમિકા શું છે?",
        options: [
          { id: 1, text: "વિદેશી પદાર્થોને ઓળખવા", isCorrect: true },
          { id: 2, text: "જંતુઓને મારવા", isCorrect: false },
          { id: 3, text: "કોષોને વિકસાવવા", isCorrect: false },
          { id: 4, text: "જંતુઓને ગાળવા", isCorrect: false },
        ],
      },
      {
        id: 10,
        text: "માનવ પ્રજ્નાન ક્રોમોસોમ્સ કેટલાં છે?",
        options: [
          { id: 1, text: "23", isCorrect: true },
          { id: 2, text: "46", isCorrect: false },
          { id: 3, text: "22", isCorrect: false },
          { id: 4, text: "48", isCorrect: false },
        ],
      },
      {
        id: 11,
        text: "આનુ તત્વના મોસમના સિદ્ધાંતોના આધારે અણુના બંધનને શું કહેવામાં આવે છે?",
        options: [
          { id: 1, text: "રાસાયણિક બંધન", isCorrect: true },
          { id: 2, text: "ભૌતિક બંધન", isCorrect: false },
          { id: 3, text: "મૉલિક્યુલર બંધન", isCorrect: false },
          { id: 4, text: "પ્રતિક્રિયા", isCorrect: false },
        ],
      },
      {
        id: 12,
        text: "એસિડ અને બેઝ વચ્ચેના પ્રમાણીક તફાવત શું છે?",
        options: [
          { id: 1, text: "એસિડ sour હોય છે અને બેઝ ખરાબ", isCorrect: false },
          { id: 2, text: "એસિડ તીક્ષ્ણ અને બેઝ કડવો", isCorrect: true },
          { id: 3, text: "એસિડ સ્વાદિષ્ટ અને બેઝ મીઠા", isCorrect: false },
          { id: 4, text: "એસિડ ગરમ અને બેઝ ઠંડા", isCorrect: false },
        ],
      },
      {
        id: 13,
        text: "ગેસ માટેની આદરણીય સમીકરણ કઈ છે?",
        options: [
          { id: 1, text: "PV = nRT", isCorrect: true },
          { id: 2, text: "PV = nR", isCorrect: false },
          { id: 3, text: "PV = nT", isCorrect: false },
          { id: 4, text: "PV = RT", isCorrect: false },
        ],
      },
      {
        id: 14,
        text: "ઓઝોનમાં ઑક્સિજનની સંખ્યાના કયા પ્રકારના કડલ છે?",
        options: [
          { id: 1, text: "ડાયમંડ", isCorrect: false },
          { id: 2, text: "મોલિક્યુલ", isCorrect: true },
          { id: 3, text: "કાચો", isCorrect: false },
          { id: 4, text: "ઇલેક્ટ્રોન", isCorrect: false },
        ],
      },
      {
        id: 15,
        text: "એસિડનો દ્રાવક શેને કહેવામાં આવે છે?",
        options: [
          { id: 1, text: "પાણી", isCorrect: true },
          { id: 2, text: "અલ્કોહોલ", isCorrect: false },
          { id: 3, text: "ઍસરિક", isCorrect: false },
          { id: 4, text: "ગેસ", isCorrect: false },
        ],
      },
      {
        id: 16,
        text: "જળનું રસાયણિક ફોર્મ્યુલા શું છે?",
        options: [
          { id: 1, text: "H2O", isCorrect: true },
          { id: 2, text: "O2H", isCorrect: false },
          { id: 3, text: "HO2", isCorrect: false },
          { id: 4, text: "H2O2", isCorrect: false },
        ],
      },
      {
        id: 17,
        text: "ક્યા ધાતુને અમલ કરવા માટે સૌથી વધારે ઊર્જા જોઈએ છે?",
        options: [
          { id: 1, text: "સોના", isCorrect: false },
          { id: 2, text: "સિમેન્ટ", isCorrect: false },
          { id: 3, text: "લોહિત", isCorrect: true },
          { id: 4, text: "કુંભ", isCorrect: false },
        ],
      },
      {
        id: 18,
        text: "પેપરનું એસિડિક અને બેઝિક માપ કેવી રીતે કરી શકાય છે?",
        options: [
          { id: 1, text: "પીએચ માપનથી", isCorrect: true },
          { id: 2, text: "ઝૂમ કરતી કમ્પોઝિટ સાથે", isCorrect: false },
          { id: 3, text: "કલર ચેન્જિંગ દ્વારા", isCorrect: false },
          { id: 4, text: "તાપમાનથી", isCorrect: false },
        ],
      },
      {
        id: 19,
        text: "કયું તત્વ ભમર બનાવે છે?",
        options: [
          { id: 1, text: "મકાં", isCorrect: false },
          { id: 2, text: "કાસ્કડ", isCorrect: false },
          { id: 3, text: "ગેસ", isCorrect: true },
          { id: 4, text: "ધાતુ", isCorrect: false },
        ],
      },
      {
        id: 20,
        text: "ગ્રહણ પ્રક્રિયાના પચાણ માટે કઈ જૈવિક ઘટકની જરૂર છે?",
        options: [
          { id: 1, text: "ક્લોરોફિલ", isCorrect: true },
          { id: 2, text: "પ્રોટીન", isCorrect: false },
          { id: 3, text: "મિનરલ્સ", isCorrect: false },
          { id: 4, text: "કાર્બોહાઇડ્રેટ", isCorrect: false },
        ],
      },
      {
        id: 21,
        text: "વિદ્યુત પ્રવાહમાં કરંટ અને વોલ્ટેજ વચ્ચેનું સંબંધ શું છે?",
        options: [
          { id: 1, text: "ઓમના નિયમ અનુસાર", isCorrect: true },
          { id: 2, text: "કુલમ્બના નિયમ અનુસાર", isCorrect: false },
          { id: 3, text: "ફારેડેના નિયમ અનુસાર", isCorrect: false },
          { id: 4, text: "એલ્કેથોના નિયમ અનુસાર", isCorrect: false },
        ],
      },
      {
        id: 22,
        text: "સ્વતંત્ર પટ્ટાના સ્રોતથી કેવી રીતે આવર્તિત ઓસિલેટિંગ મૂવમેન્ટ થાય છે?",
        options: [
          { id: 1, text: "સારું", isCorrect: false },
          { id: 2, text: "દ્રવ્યમય બાંધકામ", isCorrect: false },
          { id: 3, text: "ઓસિલેટિંગ", isCorrect: true },
          { id: 4, text: "બાંધકામ", isCorrect: false },
        ],
      },
      {
        id: 23,
        text: "ગતિના પાંચ મૂળભૂત નિયમો કયા છે?",
        options: [
          { id: 1, text: "ન્યૂટનના નિયમો", isCorrect: true },
          { id: 2, text: "ગેલિલિયોનું સિદ્ધાંત", isCorrect: false },
          { id: 3, text: "ડિઅફોર્ચોનું નિયમ", isCorrect: false },
          { id: 4, text: "ઝૂલનના નિયમો", isCorrect: false },
        ],
      },
      {
        id: 24,
        text: "ક્વાન્ટમ તત્ત્વોનો શું અર્થ છે?",
        options: [
          { id: 1, text: "દ્રવ્યકાણો", isCorrect: false },
          { id: 2, text: "મેટર", isCorrect: false },
          { id: 3, text: "સ્વતંત્ર થર્મલ્સ", isCorrect: false },
          { id: 4, text: "ક્વાંટમ ફિલોસોફી", isCorrect: true },
        ],
      },
      {
        id: 25,
        text: "વિદ્યુત ધ્રુવીઓની મૂલ્યે શું કહેવાય છે?",
        options: [
          { id: 1, text: "વીસર્જન", isCorrect: false },
          { id: 2, text: "ઓહમ", isCorrect: false },
          { id: 3, text: "એલ્કેટ્રિક કરંટ", isCorrect: true },
          { id: 4, text: "ક્લેમેન્ટ", isCorrect: false },
        ],
      },
      {
        id: 26,
        text: "સાંસ્કૃતિક અવકાશમાં મૂળભૂત તત્ત્વો કયા છે?",
        options: [
          { id: 1, text: "પરિમાણો", isCorrect: true },
          { id: 2, text: "સાંસ્કૃતિક", isCorrect: false },
          { id: 3, text: "પ્રણાલી", isCorrect: false },
          { id: 4, text: "વિકરણ", isCorrect: false },
        ],
      },
      {
        id: 27,
        text: "કયા તત્વની વિલંબ પ્રક્રિયા સૌથી વધુ છે?",
        options: [
          { id: 1, text: "હેલો", isCorrect: false },
          { id: 2, text: "આર્ક", isCorrect: false },
          { id: 3, text: "નિકેલ", isCorrect: true },
          { id: 4, text: "કાંસો", isCorrect: false },
        ],
      },
      {
        id: 28,
        text: "એકમના આધારે લંબાઈનો વિમો શું છે?",
        options: [
          { id: 1, text: "મીટર", isCorrect: true },
          { id: 2, text: "કિલો", isCorrect: false },
          { id: 3, text: "સેંડ", isCorrect: false },
          { id: 4, text: "પલ", isCorrect: false },
        ],
      },
      {
        id: 29,
        text: "વિદ્યુત ધ્રુવીઓ માટે કયો કોન્ટ્રાક્ટ છે?",
        options: [
          { id: 1, text: "કાર્યો", isCorrect: false },
          { id: 2, text: "ડ્યુટીઝ", isCorrect: false },
          { id: 3, text: "ઓહમના નિયમ", isCorrect: true },
          { id: 4, text: "ક્લેમેન્ટ", isCorrect: false },
        ],
      },
      {
        id: 30,
        text: "તાપમાનનું તત્ત્વ શું છે?",
        options: [
          { id: 1, text: "ઉષ્મા", isCorrect: false },
          { id: 2, text: "સંકુલન", isCorrect: true },
          { id: 3, text: "શક્તિ", isCorrect: false },
          { id: 4, text: "પરિમાણ", isCorrect: false },
        ],
      },
];

export default questionsData;
