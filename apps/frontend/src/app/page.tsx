import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center bg-emerald-200 gap-4'>
      <Card className='w-60 sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <h1>nagyobb</h1>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
      <ExampleCard
        title='Create Project'
        description='Deploy your new project in one-click.'
        buttonText='Deploy'
        onClick={() => alert('Deploy clicked')}
      />
    </div>
  );
}

interface ExampleCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

function ExampleCard({ title, description, buttonText, onClick }: ExampleCardProps) {
  return (
    <Card className='w-60 sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1>nagyobb</h1>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button /*onClick={() => onClick()}*/>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
