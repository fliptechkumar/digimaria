   export const getImageDynamically = (className,type,bookName) => {
   
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

    if(className=='LKG'){
      if(type=='Individual' || type=='individual'){
    console.log('bookName----',bookName)
              if(bookName=='Amuse LKG')
              return require('../../assets/images/LKG/INDIVIDUAL/Individual_1.jpg');
              else if(bookName=='Math path')
              return require('../../assets/images/class5/INDIVIDUAL/Individual_2.jpg');
              else if(bookName=='Window to science' || bookName=='windows to science')
              return require('../../assets/images/class5/INDIVIDUAL/Individual_3.jpg');
              else if(bookName=='Journey')
              return require('../../assets/images/class5/INDIVIDUAL/Individual_4.jpg');
              else if(bookName=='Popple')
              return require('../../assets/images/class5/INDIVIDUAL/Individual_5.jpg');
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
  
  }     