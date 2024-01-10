'use client'
import { Button } from "@/components/ui/buttons/Button";
import { MyButton } from "@/components/ui/buttons/MyButton";
import { Button as Button2 } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export default function Home() {
  return (
    <div className="">
      <span>About page</span>
      <Button2 
          // className="mx-2"
          // className="mx-2 bg-blue-500"
          variant="contained"
      >
        Все категории1
      </Button2>

      <Button>
        <MenuIcon/>
        Все категории2
      </Button>
    </div>
  )
}
