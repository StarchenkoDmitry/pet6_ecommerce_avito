import { validateEmail } from "./Validate";


describe("validateEmail",()=>{
    it("no valid email",()=>{
        expect(validateEmail("foo@com")).toBe(false);
    });
    
    it("no valid email",()=>{
        expect(validateEmail("bob@qwerty")).toBe(false);
    });

    it("valid russian cyrillic in email",()=>{
        expect(validateEmail("ваня@закуток.ru")).toBe(true);
    });

    it("no valid russian cyrillic in email",()=>{
        expect(validateEmail("ваня@закуток")).toBe(true);
    });
    
    it("no valid cyrillic in email",()=>{
        expect(validateEmail("киска.лапки")).toBe(false);
    });

    it("valid cyrillic in email",()=>{
        expect(validateEmail("киска@лапки.животные")).toBe(false);
    });
});
