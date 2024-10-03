   export const getImageDynamically = (className,type,bookName,extra=null) => {
    //console.log('bookName',className);
    if(className=='Class 1'){
        if(type=='Individual' || type=='individual'){
         // console.log('bookName',bookName);
          if(bookName=='Aspen')
          return require('../../assets/images/class1/INDIVIDUAL/Individual_1.jpg');
          else if(bookName=='Math path')
          return require('../../assets/images/class1/INDIVIDUAL/Individual_2.jpg');
          else if(bookName=='Windows to science')
          return require('../../assets/images/class1/INDIVIDUAL/Individual_3.jpg');
          else if(bookName=='Grow Green')
          return require('../../assets/images/class1/INDIVIDUAL/Individual_4.jpg');
          else if(bookName=='Popple')
          return require('../../assets/images/class1/INDIVIDUAL/Individual_5.jpg');
          else if(bookName=='Term 1')
          return require('../../assets/images/class1/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class1/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class1/TERM/Term_3.jpg');
          else if(bookName=='Semester 1')
          return require('../../assets/images/class1/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class1/SEMESTER/Semester_2.jpg');
        }
        else if(type=='term'){
          console.log('bookName',bookName)
            if(bookName==1)
            return require('../../assets/images/class1/TERM/Term_1.jpg');
            else if(bookName==2)
            return require('../../assets/images/class1/TERM/Term_2.jpg');
            else if(bookName==3)
            return require('../../assets/images/class1/TERM/Term_3.jpg');
       
        }
        else if(type=='semester'){
          //alert(bookName)
            if(bookName==1)
            return require('../../assets/images/class1/SEMESTER/Semester_1.jpg');
            else if(bookName==2)
            return require('../../assets/images/class1/SEMESTER/Semester_2.jpg');
        }
  
  
    }
    if(className=='Class 2'){
        if(type=='Individual' || type=='individual'){
          if(bookName=='Aspen')
          return require('../../assets/images/class2/INDIVIDUAL/Individual_1.jpg');
          else if(bookName=='Math path')
          return require('../../assets/images/class2/INDIVIDUAL/Individual_2.jpg');
          else if(bookName=='Windows to science'|| bookName=='windows to science')
          return require('../../assets/images/class2/INDIVIDUAL/Individual_3.jpg');
          else if(bookName=='Grow Green')
          return require('../../assets/images/class2/INDIVIDUAL/Individual_4.jpg');
          else if(bookName=='Popple')
          return require('../../assets/images/class2/INDIVIDUAL/Individual_5.jpg');
          else if(bookName=='Term 1')
          return require('../../assets/images/class2/TERM/Term_1.jpg');
          else if(bookName=='Term 2')
          return require('../../assets/images/class2/TERM/Term_2.jpg');
          else if(bookName=='Term 3')
          return require('../../assets/images/class2/TERM/Term_3.jpg');
          else if(bookName=='Semester 1')
          return require('../../assets/images/class2/SEMESTER/Semester_1.jpg');
          else if(bookName=='Semester 2')
          return require('../../assets/images/class2/SEMESTER/Semester_2.jpg');
        }
        else if(type=='term'){
            if(bookName=='1')
            return require('../../assets/images/class2/TERM/Term_1.jpg');
            else if(bookName=='2')
            return require('../../assets/images/class2/TERM/Term_2.jpg');
            else if(bookName=='3')
            return require('../../assets/images/class2/TERM/Term_3.jpg');
       
        }
        else if(type=='semester'){
            if(bookName=='1')
            return require('../../assets/images/class2/SEMESTER/Semester_1.jpg');
            else if(bookName=='2')
            return require('../../assets/images/class2/SEMESTER/Semester_2.jpg');
       
        }
    }
  if(className=='Class 3'){
    if(type=='Individual' || type=='individual'){
     // console.log('bookName',bookName);
                if(bookName=='Aspen')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_1.jpg');
                else if(bookName=='Math path')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_2.jpg');
                else if(bookName=='Windows to science')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_3.jpg');
                else if(bookName=='Journey')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_4.jpg');
                else if(bookName=='Popple')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_5.jpg');
                else if(bookName=='Grow green')
                return require('../../assets/images/class3/INDIVIDUAL/Individual_6.png');
                else if(bookName=='Term 1')
                return require('../../assets/images/class3/TERM/Term_1.jpg');
                else if(bookName=='Term 2')
                return require('../../assets/images/class3/TERM/Term_2.jpg');
                else if(bookName=='Term 3')
                return require('../../assets/images/class3/TERM/Term_3.jpg');
                else if(bookName=='Semester 1')
                return require('../../assets/images/class3/SEMESTER/Semester_1.jpg');
                else if(bookName=='Semester 2')
                return require('../../assets/images/class3/SEMESTER/Semester_2.jpg');
        }
  
        else if(type=='term'){
            if(bookName=='1')
            return require('../../assets/images/class3/TERM/Term_1.jpg');
            else if(bookName=='2')
            return require('../../assets/images/class3/TERM/Term_2.jpg');
            else if(bookName=='3')
            return require('../../assets/images/class3/TERM/Term_3.jpg');
       
        }
        else if(type=='semester'){
            if(bookName=='1')
            return require('../../assets/images/class3/SEMESTER/Semester_1.jpg');
            else if(bookName=='2')
            return require('../../assets/images/class3/SEMESTER/Semester_2.jpg');
       
        }
    }
  
    if(className=='Class 4'){
        if(type=='Individual' || type=='individual'){
              if(bookName=='Aspen')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_1.jpg');
              else if(bookName=='Math path')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_2.jpg');
              else if(bookName=='Windows to science')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_3.jpg');
              else if(bookName=='Journey')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_4.jpg');
              else if(bookName=='Popple')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_5.jpg');
              else if(bookName=='Grow green')
              return require('../../assets/images/class4/INDIVIDUAL/Individual_6.png');
              else if(bookName=='Term 1')
              return require('../../assets/images/class4/TERM/Term_1.jpg');
              else if(bookName=='Term 2')
              return require('../../assets/images/class4/TERM/Term_2.jpg');
              else if(bookName=='Term 3')
              return require('../../assets/images/class4/TERM/Term_3.jpg');
              else if(bookName=='Semester 1')
              return require('../../assets/images/class4/SEMESTER/Semester_1.jpg');
              else if(bookName=='Semester 2')
              return require('../../assets/images/class4/SEMESTER/Semester_2.jpg');
      }
      else if(type=='term'){
          if(bookName=='1')
          return require('../../assets/images/class4/TERM/Term_1.jpg');
          else if(bookName=='2')
          return require('../../assets/images/class4/TERM/Term_2.jpg');
          else if(bookName=='3')
          return require('../../assets/images/class4/TERM/Term_3.jpg');
     
      }
      else if(type=='semester'){
          if(bookName=='1')
          return require('../../assets/images/class4/SEMESTER/Semester_1.jpg');
          else if(bookName=='2')
          return require('../../assets/images/class4/SEMESTER/Semester_2.jpg');
     
      }
  }
  if(className=='Class 5'){
    if(type=='Individual' || type=='individual'){
  //console.log('bookName',bookName)
            if(bookName=='Aspen')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_1.jpg');
            else if(bookName=='Math path')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_2.jpg');
            else if(bookName=='Window to science' || bookName=='windows to science')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_3.jpg');
            else if(bookName=='Journey')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_4.jpg');
            else if(bookName=='Popple')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_5.jpg');
            else if(bookName=='Grow green')
            return require('../../assets/images/class5/INDIVIDUAL/Individual_6.png');
            else if(bookName=='Term 1')
            return require('../../assets/images/class5/TERM/Term_1.jpg');
            else if(bookName=='Term 2')
            return require('../../assets/images/class5/TERM/Term_2.jpg');
            else if(bookName=='Term 3')
            return require('../../assets/images/class5/TERM/Term_3.jpg');
            else if(bookName=='Semester 1')
            return require('../../assets/images/class5/SEMESTER/Semester_1.jpg');
            else if(bookName=='Semester 2')
            return require('../../assets/images/class5/SEMESTER/Semester_2.jpg');
    }
    else if(type=='term'){
        if(bookName=='1')
        return require('../../assets/images/class5/TERM/Term_1.jpg');
        else if(bookName=='2')
        return require('../../assets/images/class5/TERM/Term_2.jpg');
        else if(bookName=='3')
        return require('../../assets/images/class5/TERM/Term_3.jpg');
   
    }
    else if(type=='semester'){
        if(bookName=='1')
        return require('../../assets/images/class5/SEMESTER/Semester_1.jpg');
        else if(bookName=='2')
        return require('../../assets/images/class5/SEMESTER/Semester_2.jpg');
   
      }
    }

  if(className=='Amuse LKG'){
   
     if(type=='term'){
        if(bookName=='1')
        return require('../../assets/images/LKG/TERM/Term_1.png');
        else if(bookName=='2')
        return require('../../assets/images/LKG/TERM/Term_2.png');
        else if(bookName=='3')
        return require('../../assets/images/LKG/TERM/Term_3.png');
  
    }
    else if(type=='semester'){
        if(bookName=='1')
        return require('../../assets/images/LKG/SEMESTER/Semester_1.png');
        else if(bookName=='2')
        return require('../../assets/images/LKG/SEMESTER/Semester_2.png');
  
      }
      }
  if(className=='Amuse UKG'){
   
      if(type=='term'){
         if(bookName=='1')
         return require('../../assets/images/UKG/TERM/Term_1.png');
         else if(bookName=='2')
         return require('../../assets/images/UKG/TERM/Term_2.png');
         else if(bookName=='3')
         return require('../../assets/images/UKG/TERM/Term_3.png');
   
     }
     else if(type=='semester'){
         if(bookName=='1')
         return require('../../assets/images/UKG/SEMESTER/Semester_1.png');
         else if(bookName=='2')
         return require('../../assets/images/UKG/SEMESTER/Semester_2.png');
   
       }
      }
  if(className=='Get Together LKG'){
     
       if(type=='term'){
          if(bookName=='1')
          return require('../../assets/images/GTLKG/TERM/Term_1.png');
          else if(bookName=='2')
          return require('../../assets/images/GTLKG/TERM/Term_2.png');
          else if(bookName=='3')
          return require('../../assets/images/GTLKG/TERM/Term_3.png');
    
      }
      else if(type=='semester'){
          if(bookName=='1')
          return require('../../assets/images/LKG/SEMESTER/Semester_1.png');
          else if(bookName=='2')
          return require('../../assets/images/LKG/SEMESTER/Semester_2.png');
    
        }
      }
  if(className=='Get Together UKG'){
     
        if(type=='term'){
           if(bookName=='1')
           return require('../../assets/images/GTUKG/TERM/Term_1.png');
           else if(bookName=='2')
           return require('../../assets/images/GTUKG/TERM/Term_2.png');
           else if(bookName=='3')
           return require('../../assets/images/GTUKG/TERM/Term_3.png');
     
       }
       else if(type=='semester'){
           if(bookName=='1')
           return require('../../assets/images/LKG/SEMESTER/Semester_1.png');
           else if(bookName=='2')
           return require('../../assets/images/LKG/SEMESTER/Semester_2.png');
     
         }
      }
  if(className=='Marbles LKG'){

        if(type=='Individual' || type=='individual'){
      console.log('bookName',bookName)
                if(bookName=='Marbles_English')
                return require('../../assets/images/MLKG/INDIVIDUAL/marbles_english_juniors_cover.png');
                else if(bookName=='Marbles_Maths')
                return require('../../assets/images/MLKG/INDIVIDUAL/marbles_maths_juniors_cover.png');
                else 
                return require('../../assets/images/MLKG/INDIVIDUAL/marbles_evs_juniors_cover.png');                
        }
       
        }
        if(className=='Marbles UKG'){
          if(type=='Individual' || type=='individual'){
        //console.log('bookName',bookName)
                  if(bookName=='Marbles_English')
                  return require('../../assets/images/MUKG/INDIVIDUAL/marbles_english_seniors_cover.png');
                  else if(bookName=='Marbles_Maths')
                  return require('../../assets/images/MUKG/INDIVIDUAL/marbles_maths_seniors_cover.png');
                  else
                  return require('../../assets/images/MUKG/INDIVIDUAL/marbles_evs_seniors_cover.png');               
            }
         
          }
  }     