import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';


const routes: Routes = [
  {
    path: '/user',
    children: [
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    ],
  controllers: [],
  providers: [],
})
export class UserPanelModule {}
