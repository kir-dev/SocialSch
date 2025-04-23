import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='bg-red'>
      <Card className='w-80 min-w-[320px] bg-red'>
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
    </div>
  );
}
