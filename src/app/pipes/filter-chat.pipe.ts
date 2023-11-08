import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterChat'
})
export class FilterChatPipe implements PipeTransform {
  transform(chats: any[], searchText: string): any[] {
    if (!chats) return [];
    if (!searchText) return chats;
    searchText = searchText.toLowerCase();
    return chats.filter(chat => {
      return chat.title.toLowerCase().includes(searchText);
    });
  }
}
